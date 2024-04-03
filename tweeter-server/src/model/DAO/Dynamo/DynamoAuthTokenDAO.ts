import {AuthTokenDAO} from "../interface/AuthTokenDAO";
import {AuthToken} from "tweeter-shared/dist"
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient, DynamoDBServiceException} from "@aws-sdk/client-dynamodb";

export class DynamoAuthTokenDAO implements AuthTokenDAO{
    private authTokenKey = "authToken"
    private ttlKey = "expires"
    private tableName = "AuthToken"

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async deleteAuthToken(authToken: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateAuthTokenObject(authToken),
        };
        try{
            await this.client.send(new DeleteCommand(params));
        } catch (e: DynamoDBServiceException) {
            console.log("Error deleting authToken from database", e.message)
        }
    }

    async getAuthToken(authToken: string): Promise<AuthToken | undefined> {
        const params = {
            TableName: this.tableName,
            Key: this.generateAuthTokenObject(authToken),
        };
        try{
            const output = await this.client.send(new GetCommand(params));
            return output.Item == undefined
                ? undefined
                : new AuthToken(
                    output.Item[this.authTokenKey],
                    output.Item[this.ttlKey],
                );
        } catch(e: DynamoDBServiceException) {
            console.log("Error getting authToken from database", e.message)
        }

    }

    async insertAuthToken(authToken: AuthToken): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.authTokenKey]: authToken.token,
                [this.ttlKey]: authToken.timestamp,
            },
        };
        try {
            await this.client.send(new PutCommand(params));
        } catch (e: DynamoDBServiceException) {
            console.log("Error inserting authToken in the database", e.message)
        }
    }

    async updateAuthToken(authToken: AuthToken): Promise<void> {
        return await this.insertAuthToken(authToken)
    }

    private generateAuthTokenObject(auth: string) {
        return {
            [this.authTokenKey]: auth
        }
    }

}