import {AuthToken, FakeData, User} from "tweeter-shared";

export class UserService {
    public async login(alias: string, password: string): Promise<[User, AuthToken]> {
        // TODO: Replace with the result of calling the server
        let user = FakeData.instance.firstUser;

        if (user === null) {
            throw new Error("[Bad Request] invalid username or password");
        }

        return [user, FakeData.instance.authToken];
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

        // TODO: Replace with the result of calling the server
        let user = FakeData.instance.firstUser;

        if (user === null) {
            throw new Error("[Bad Request] user was null when logging in");
        }

        return [user, FakeData.instance.authToken];
    };

    public async doLogout (authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    };

    public async getIsFollowerStatus (
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        return FakeData.instance.isFollower();
    };

    public async getFolloweesCount (
        authToken: AuthToken,
        user: User
    ){

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweesCount(user);
    };

    public  async getFollowersCount (
        authToken: AuthToken,
        user: User
    ) {

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowersCount(user);
    };

    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {

        if(alias === null){
            throw new Error("[Bad Request] invalid alias")
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias);
    };

    public async unfollow (
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        if (userToUnfollow === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        let followersCount = await this.getFollowersCount(authToken, userToUnfollow);
        let followeesCount = await this.getFolloweesCount(authToken, userToUnfollow);

        if(followersCount === null || followeesCount === null){
            throw new Error("[Bad Request] follower/followee count was null in the database")
        }

        return [followersCount, followeesCount];
    };

    public async follow (
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {

        if (userToFollow === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        let followersCount = await this.getFollowersCount(authToken, userToFollow);
        let followeesCount = await this.getFolloweesCount(authToken, userToFollow);

        if(followersCount === null || followeesCount === null){
            throw new Error("[Bad Request] follower/followee count was null in the database")
        }

        return [followersCount, followeesCount];
    };
}