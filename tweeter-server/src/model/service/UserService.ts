import {AuthToken, FakeData, User} from "tweeter-shared";
import {DynamoFactoryDAO} from "../DAO/DynamoFactoryDAO";
import {UserDAO} from "../DAO/interface/UserDAO";
import {AuthTokenDAO} from "../DAO/interface/AuthTokenDAO";
import {Service} from "./Service";
import {FollowsDAO} from "../DAO/interface/FollowsDAO";

export class UserService extends Service {

     private userDAO: UserDAO;
     private authTokenDAO: AuthTokenDAO;
     private followsDAO: FollowsDAO;

    constructor(){
        super()
        const daoFactory = new DynamoFactoryDAO()
        this.userDAO = daoFactory.getUserDAO();
        this.authTokenDAO = daoFactory.getAuthTokenDAO();
        this.followsDAO = daoFactory.getFollowsDAO();
    }

     private createAuthToken(){
         const currentTime = Date.now();
         const expirationTime = (currentTime + 4 * 60 * 60 * 1000)/1000;
         return new AuthToken(crypto.randomUUID(), expirationTime)
     }

    public async login(alias: string, password: string): Promise<[User, AuthToken]> {

        let user = await this.userDAO.getUserByAlias(alias);

        if (user === undefined) {
            throw new Error("[Bad Request] invalid username or password");
        }

        const auth = this.createAuthToken()
        await this.authTokenDAO.insertAuthToken(auth, alias)

        return [user, auth];
    };

    public async register (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        let imageStringBase64: string =
            Buffer.from(userImageBytes).toString("base64");

        let user = new User(firstName, lastName, alias, imageStringBase64);
        const currentTime = Date.now();
        const expirationTime = currentTime + 4 * 60 * 60 * 1000;
        const authToken = new AuthToken(crypto.randomUUID(), expirationTime)

        await this.authTokenDAO.insertAuthToken(authToken, alias);
        await this.userDAO.insertUser(user, password);

        return [user, authToken];
    };

    public async doLogout (authToken: AuthToken): Promise<void> {
        await this.authTokenDAO.deleteAuthToken(authToken.token);
    };

    public async getIsFollowerStatus (
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {

        await this.validateAuthToken(authToken);

        const status = await this.followsDAO.getFollower(user, selectedUser)

        return !!status;
    };

    public async getFolloweesCount (
        authToken: AuthToken,
        user: User
    ){
        await this.validateAuthToken(authToken);
        return await this.userDAO.getFolloweeCount(user.alias)
    };

    public  async getFollowersCount (
        authToken: AuthToken,
        user: User
    ) {
        await this.validateAuthToken(authToken);
        return await this.userDAO.getFollowerCount(user.alias)
    };

    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | undefined> {

        await this.validateAuthToken(authToken)

        return await this.userDAO.getUserByAlias(alias)
    };

    public async unfollow (
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        let alias = await this.validateAuthToken(authToken)
        let user = await this.userDAO.getUserByAlias(alias)
        if(!user){
            throw new Error("[Bad Request] user invalid")
        }
        await this.followsDAO.deleteFollower(user, userToUnfollow)

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

        let alias = await this.validateAuthToken(authToken)
        let user = await this.userDAO.getUserByAlias(alias)
        if(!user){
            throw new Error("[Bad Request] user invalid")
        }
        await this.followsDAO.insertFollower(user, userToFollow)

        let followersCount = await this.getFollowersCount(authToken, userToFollow);
        let followeesCount = await this.getFolloweesCount(authToken, userToFollow);

        if(followersCount === null || followeesCount === null){
            throw new Error("[Bad Request] follower/followee count was null in the database")
        }

        return [followersCount, followeesCount];
    };
}