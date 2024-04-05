import {AuthToken, Status, User} from "tweeter-shared";
import {FeedDAO} from "../DAO/interface/FeedDAO";
import {DynamoFactoryDAO} from "../DAO/DynamoFactoryDAO";
import {AuthTokenDAO} from "../DAO/interface/AuthTokenDAO";
import {UserDAO} from "../DAO/interface/UserDAO";
import {StoryDAO} from "../DAO/interface/StoryDAO";
import {Service} from "./Service";
import {FollowsDAO} from "../DAO/interface/FollowsDAO";

export class StatusService extends Service {

    feedDAO: FeedDAO;
    userDAO: UserDAO;
    storyDAO: StoryDAO;
    followsDAO: FollowsDAO;

    constructor() {
        super()
        const factoryDAO = new DynamoFactoryDAO()
        this.feedDAO = factoryDAO.getFeedDAO()
        this.userDAO = factoryDAO.getUserDAO()
        this.storyDAO = factoryDAO.getStoryDAO()
        this.followsDAO = factoryDAO.getFollowsDAO()
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

        const userAlias = await this.validateAuthToken(authToken)
        const result = await this.userDAO.getUserByAlias(userAlias)
        const user = result[0]
        if(user === undefined){
            throw new Error("[Bad Request] user not defined")
        }
        await this.storyDAO.postStory(user, newStatus)
        let hasMoreItems = true;
        let followers: User[] = []
        let lastItem = null;
        while(hasMoreItems){
            let result = await this.followsDAO.getPageOfFollowers(userAlias, lastItem, 20);
            if(result){
                followers = result.values;
                hasMoreItems = result.hasMorePages;
                lastItem = result.values[followers.length - 1]

                for(const follower of followers){
                    let newFollower = User.fromJson(JSON.stringify(follower))
                    if(newFollower){
                        await this.feedDAO.postFeed(newFollower, newStatus)
                    }
                }
            }
        }
    };
}