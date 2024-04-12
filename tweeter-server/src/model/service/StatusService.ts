import {AuthToken, Status, FeedQueueRequest, User} from "tweeter-shared";
import {FeedDAO} from "../DAO/interface/FeedDAO";
import {DynamoFactoryDAO} from "../DAO/DynamoFactoryDAO";
import {SendMessageCommand, SQSClient} from "@aws-sdk/client-sqs";
import {UserDAO} from "../DAO/interface/UserDAO";
import {StoryDAO} from "../DAO/interface/StoryDAO";
import {Service} from "./Service";
import {FollowsDAO} from "../DAO/interface/FollowsDAO";

export class StatusService extends Service {

    feedDAO: FeedDAO;
    userDAO: UserDAO;
    storyDAO: StoryDAO;
    followsDAO: FollowsDAO;
    sqsClient: SQSClient;


    constructor() {
        super()
        const factoryDAO = new DynamoFactoryDAO()
        this.feedDAO = factoryDAO.getFeedDAO()
        this.userDAO = factoryDAO.getUserDAO()
        this.storyDAO = factoryDAO.getStoryDAO()
        this.followsDAO = factoryDAO.getFollowsDAO()
        this.sqsClient = new SQSClient();
    }

    public async loadMoreStoryItems (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        await this.validateAuthToken(authToken)
        const result = await this.storyDAO.getUserStoryPage(user, lastItem, pageSize);
        return [result.values, result.hasMorePages]
    };

    public async loadMoreFeedItems (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {

        await this.validateAuthToken(authToken);
        const result = await this.feedDAO.getUserFeedPage(user, lastItem, pageSize);
        return [result.values, result.hasMorePages]
    };

    public async postStatus (
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {

        await this.validateAuthToken(authToken)

        var messageBody = JSON.stringify(newStatus)

        const sqs_url = "https://sqs.us-west-2.amazonaws.com/096981444592/PostStatusQueue";

        const params = {
            DelaySeconds: 10,
            MessageBody: messageBody,
            QueueUrl: sqs_url,
        };

        try {
            const data = await this.sqsClient.send(new SendMessageCommand(params));
            console.log("Success, message sent. MessageID:", data.MessageId);
        } catch (err) {
            throw err;
        }

    }

    public async postStatusQueue(status: Status): Promise<void> {

        const sqs_url = "https://sqs.us-west-2.amazonaws.com/096981444592/UpdateFeedQueue";

        await this.storyDAO.postStory(status.user, status)
        let hasMoreItems = true;
        let followers: User[] = []
        let lastItem: User | null = null;
        while(hasMoreItems){
            let result = await this.followsDAO.getPageOfFollowers(status.user.alias, lastItem as User, 100);
            if(result){
                followers = result.values;
                const aliasArray: string[] = []
                result.values.forEach((user) => {
                    const newUser = User.fromJson(JSON.stringify(user))
                    if(newUser !== null){ aliasArray.push(newUser.alias) }
                });
                hasMoreItems = result.hasMorePages;
                lastItem = User.fromJson(JSON.stringify(result.values[followers.length - 1]))

                //insert into queue
                const req = new FeedQueueRequest(status, aliasArray)

                const params = {
                    DelaySeconds: 10,
                    MessageBody: JSON.stringify(req),
                    QueueUrl: sqs_url,
                };

                try {
                    const data = await this.sqsClient.send(new SendMessageCommand(params));
                    console.log("Success, message sent. MessageID:", data.MessageId);
                } catch (err) {
                    throw err;
                }
            }
        }
    }

    public async postFeedQueue(status: Status, aliasArray: string[]){
        for (const alias of aliasArray) {
            await this.feedDAO.postFeed(alias, status)
        }
    }

}
