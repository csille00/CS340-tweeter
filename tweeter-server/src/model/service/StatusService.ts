import {AuthToken, FakeData, Status, User} from "tweeter-shared";
import {FeedDAO} from "../DAO/interface/FeedDAO";
import {DynamoFactoryDAO} from "../DAO/DynamoFactoryDAO";
import {AuthTokenDAO} from "../DAO/interface/AuthTokenDAO";
import {UserDAO} from "../DAO/interface/UserDAO";

export class StatusService {

    feedDAO: FeedDAO
    authDAO: AuthTokenDAO
    userDAO: UserDAO
    constructor() {
        const factoryDAO = new DynamoFactoryDAO()
        this.feedDAO = factoryDAO.getFeedDAO()
        this.authDAO = factoryDAO.getAuthTokenDAO()
        this.userDAO = factoryDAO.getUserDAO()
    }


    public async loadMoreStoryItems (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    };

    public async loadMoreFeedItems (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        // TODO: Replace with the result of calling server
        const result = await this.feedDAO.getUserFeedPage(user, lastItem, pageSize)
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

        return this.feedDAO.postFeed(newStatus)
    };
}