import {AuthToken, Status, User} from "tweeter-shared";
import {FeedDAO} from "../DAO/interface/FeedDAO";
import {DynamoFactoryDAO} from "../DAO/DynamoFactoryDAO";
import {AuthTokenDAO} from "../DAO/interface/AuthTokenDAO";
import {UserDAO} from "../DAO/interface/UserDAO";
import {StoryDAO} from "../DAO/interface/StoryDAO";
import {Service} from "./Service";

export class StatusService extends Service {

    feedDAO: FeedDAO;
    authDAO: AuthTokenDAO;
    userDAO: UserDAO;
    storyDAO: StoryDAO;

    constructor() {
        super()
        const factoryDAO = new DynamoFactoryDAO()
        this.feedDAO = factoryDAO.getFeedDAO()
        this.authDAO = factoryDAO.getAuthTokenDAO()
        this.userDAO = factoryDAO.getUserDAO()
        this.storyDAO = factoryDAO.getStoryDAO()
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

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        const userAlias = await this.authDAO.getAuthToken(authToken.token)
        const user = this

        // return this.feedDAO.postFeed(newStatus)
    };
}