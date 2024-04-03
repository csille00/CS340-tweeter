import {AuthTokenDAO} from "../DAO/interface/AuthTokenDAO";
import {DynamoFactoryDAO} from "../DAO/DynamoFactoryDAO";
import {AuthToken} from "tweeter-shared";

export class Service {
    private authDAO: AuthTokenDAO = null!;

    Service(){
        const daoFactory = new DynamoFactoryDAO()
        this.authDAO = daoFactory.getAuthTokenDAO();
    }

    protected async validateAuthToken(authToken: AuthToken): Promise<boolean> {
        const result = await this.authDAO.getAuthToken(authToken.token);
        if(result === undefined) throw new Error("[AuthError] invalid authtoken");
        return true;
    }
}