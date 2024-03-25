import {AuthToken, FakeData, Status, User} from "tweeter-shared";
import {ServerFacade} from "./net/ServerFacade";
import {StatusItemsRequest} from "tweeter-shared/dist/model/net/Request";

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
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    };

    public async postStatus (
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server to post the status
    };
}