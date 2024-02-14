import {AuthToken, FakeData, User} from "tweeter-shared";

export class UserService {

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

    public async login(): Promise<[User, AuthToken]> {
        // TODO: Replace with the result of calling the server
        let user = FakeData.instance.firstUser;

        if (user === null) {
            throw new Error("Invalid alias or password");
        }

        return [user, FakeData.instance.authToken];
    };
}