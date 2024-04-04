import {AuthTokenDAO} from "../DAO/interface/AuthTokenDAO";
import {DynamoFactoryDAO} from "../DAO/DynamoFactoryDAO";
import {AuthToken} from "tweeter-shared";

export class Service {
    private authDAO: AuthTokenDAO = null!;

    constructor(){
        const daoFactory = new DynamoFactoryDAO()
        this.authDAO = daoFactory.getAuthTokenDAO();
    }

    protected async validateAuthToken(authToken: AuthToken): Promise<string> {
        const result = await this.authDAO.getAuthToken(authToken.token);
        if(result === undefined) throw new Error("[AuthError] invalid authtoken");

        const currentTime = Date.now();
        const expirationTime = (currentTime + 4 * 60 * 60 * 1000)/1000;
        const newAuthToken = new AuthToken(authToken.token, expirationTime)
        await this.authDAO.updateAuthToken(newAuthToken, result)

        return result;
    }
}
