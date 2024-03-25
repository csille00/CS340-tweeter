import {
    AuthToken,
    FakeData, FollowerStatusRequest,
    GetUserRequest,
    LoginRequest,
    LogoutRequest,
    RegisterRequest,
    User,
    UserRequest
} from "tweeter-shared";
import {Buffer} from "buffer";
import {ServerFacade} from "./net/ServerFacade";
import {FollowCountResponse, FollowerStatusResponse, GetUserResponse} from "tweeter-shared/dist/model/net/Response";

export class UserService {

    serverFacade = new ServerFacade();

    public async getIsFollowerStatus (
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        const response: FollowerStatusResponse = await this.serverFacade.getFollowerStatus(new FollowerStatusRequest(user, authToken, selectedUser))
        return response.status
    };

    public async getFolloweesCount (
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        const response: FollowCountResponse = await this.serverFacade.getFolloweeCount(new UserRequest(user, authToken))
        return response.count
    };

    public  async getFollowersCount (
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        const response: FollowCountResponse = await this.serverFacade.getFollowerCount(new UserRequest(user, authToken))
        return response.count
    };

    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        const response: GetUserResponse = await this.serverFacade.getUser(new GetUserRequest(authToken, alias))
        return response.user
    };

    public async login(alias: string, password: string): Promise<[User, AuthToken]> {
        const response = await this.serverFacade.login(new LoginRequest(alias, password));
        return [response.user, response.token]
    };

    public async register (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        let imageStringBase64: string =
            Buffer.from(userImageBytes).toString("base64");

        const response = await this.serverFacade.register(
            new RegisterRequest(alias, password, firstName, lastName, userImageBytes)
        )
        return [response.user, response.token];
    };

    public async doLogout (authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await this.serverFacade.logout( new LogoutRequest(authToken) )
    };

    public async unfollow (
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        const response = await this.serverFacade.follow(new UserRequest(userToUnfollow, authToken))
        return [response.followersCount, response.followeesCount]
    };

    public async follow (
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        const response = await this.serverFacade.unfollow(new UserRequest(userToFollow, authToken))
        return [response.followersCount, response.followeesCount]
    };
}
