import {AuthToken, FakeData, LoginRequest, RegisterRequest, User} from "tweeter-shared";
import {Buffer} from "buffer";
import {ServerFacade} from "./net/ServerFacade";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export class UserService {

    serverFacade = new ServerFacade();

    public async getIsFollowerStatus (
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.isFollower();
    };

    public async getFolloweesCount (
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweesCount(user);
    };

    public  async getFollowersCount (
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowersCount(user);
    };

    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias);
    };

    public async login(alias: string, password: string): Promise<[User, AuthToken]> {
        const response = await this.serverFacade.login(new LoginRequest(alias, password));
        const user = User.fromDto(response.user)
        const token = AuthToken.fromDto(response.token)
        if(user != null && token != null){
            return [user, token]
        } else {
            throw new Error("User or token was null in client side service login call");
        }
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

        const response = await this.serverFacade.login(new LoginRequest(alias, password));
        const user = User.fromDto(response.user)
        const token = AuthToken.fromDto(response.token)
        if(user != null && token != null){
            return [user, token]
        } else {
            throw new Error("User or token was null in client side service login call");
        }
    };

    public async doLogout (authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };
}