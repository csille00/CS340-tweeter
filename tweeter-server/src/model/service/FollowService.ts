import {AuthToken, FakeData, User} from "tweeter-shared";
import {Service} from "./Service";
import {UserDAO} from "../DAO/interface/UserDAO";
import {AuthTokenDAO} from "../DAO/interface/AuthTokenDAO";
import {FollowsDAO} from "../DAO/interface/FollowsDAO";
import {DynamoFactoryDAO} from "../DAO/DynamoFactoryDAO";

export class FollowService extends Service {


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

    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {

        await this.validateAuthToken(authToken)

        const result = await this.followsDAO.getPageOfFollowers(user.alias, lastItem, pageSize);
        if(!result){
            throw new Error("[Bad Request] failed to get page of followers")
        }
        return [result.values, result.hasMorePages]
    };

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {

        await this.validateAuthToken(authToken)

        const result = await this.followsDAO.getPageOfFollowers(user.alias, lastItem, pageSize);
        if(!result){
            throw new Error("[Bad Request] failed to get page of followers")
        }
        return [result.values, result.hasMorePages]

    };
}