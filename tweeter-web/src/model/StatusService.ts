import {AuthToken, FakeData, Status, User} from "tweeter-shared";
import {ServerFacade} from "./net/ServerFacade";
import {PostStatusRequest, StatusItemsRequest} from "tweeter-shared/dist/model/net/Request";

export class StatusService {

    serverFacade = new ServerFacade();

    public async loadMoreStoryItems (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        const response = await this.serverFacade.loadMoreStoryItems(new StatusItemsRequest(authToken, user, pageSize, lastItem))
        return [response.statusItems, response.hasMoreItems]
    };

    public async loadMoreFeedItems (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        const response = await this.serverFacade.loadMoreFeedItems(new StatusItemsRequest(authToken, user, pageSize, lastItem))
        return [response.statusItems, response.hasMoreItems]
    };

    public async postStatus (
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        await this.serverFacade.postStatus(new PostStatusRequest(authToken, newStatus))
    };
}