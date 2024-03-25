import {AuthToken, FakeData, User} from "tweeter-shared";
import {ServerFacade} from "./net/ServerFacade";
import {UserItemsRequest} from "tweeter-shared/dist/model/net/Request";

export class FollowService{

    serverFacade = new ServerFacade()
    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        const resp = await this.serverFacade.loadMoreFollowers(new UserItemsRequest(authToken, user, pageSize, lastItem))
        return [resp.userItems, resp.hasMoreItems]
    };

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        const resp = await this.serverFacade.loadMoreFollowees(new UserItemsRequest(authToken, user, pageSize, lastItem))
        return [resp.userItems, resp.hasMoreItems]
    };
}