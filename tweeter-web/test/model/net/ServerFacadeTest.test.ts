import {RegisterRequest, AuthenticateResponse, AuthToken, User, UserRequest} from 'tweeter-shared';
import {ServerFacade} from "../../../src/model/net/ServerFacade";
import "@testing-library/jest-dom"
import "isomorphic-fetch"
import {UserItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {FollowCountResponse, LoadUserItemsResponse} from "tweeter-shared/dist/model/net/Response";

describe('ServerFacade', () => {
    let serverFacade: ServerFacade;

    beforeEach(() => {
        serverFacade = new ServerFacade();
    });

    it('successfully registers a user', async () => {
        const registerRequest = new RegisterRequest('newUser', 'newPass', 'New', 'User', [] as unknown as Uint8Array);

        const response = await serverFacade.register(registerRequest);

        expect(response).toBeInstanceOf(AuthenticateResponse);
        expect(response.success).toBeTruthy();
    });

    it('Load more followers endpoint', async () => {
        const token = new AuthToken("test", 123);
        const user = new User("test", "test", "@amy", "string")

        const response = await serverFacade.loadMoreFollowers(new UserItemsRequest(token, user, 10, null));

        expect(response).toBeInstanceOf(LoadUserItemsResponse);
        expect(response.userItems.length).toBe(10)
        expect(response.success).toBeTruthy();
    });

    it('Get Follower Count', async () => {
        const token = new AuthToken("test", 123);
        const user = new User("test", "test", "@amy", "string")

        const response = await serverFacade.getFollowerCount(new UserRequest(user, token));

        expect(response).toBeInstanceOf(FollowCountResponse);
        expect(response.count).toBe(20)
        expect(response.success).toBeTruthy();
    });
});