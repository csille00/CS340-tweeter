import {AuthTokenDAO} from "../interface/AuthTokenDAO";
import {AuthToken} from "tweeter-shared/dist"
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

export class DynamoAuthTokenDAO implements AuthTokenDAO{
    private authTokenKey = "authToken"
    private ttlKey = "expires"
    private tableName = "AuthToken"
    private aliasAttribute = "alias"


    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async deleteAuthToken(authToken: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateAuthTokenObject(authToken),
        };
        await this.client.send(new DeleteCommand(params));
    }

    async getAuthToken(authToken: string): Promise<string | undefined> {
        const params = {
            TableName: this.tableName,
            Key: this.generateAuthTokenObject(authToken),
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined
            ? undefined
            : output.Item[this.aliasAttribute];
    }

    async insertAuthToken(authToken: AuthToken, alias: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.authTokenKey]: authToken.token,
                [this.ttlKey]: authToken.timestamp,
                [this.aliasAttribute]: alias
            },
        };
        await this.client.send(new PutCommand(params));

    }

    async updateAuthToken(authToken: AuthToken, alias: string): Promise<void> {
        return await this.insertAuthToken(authToken, alias)
    }

    private generateAuthTokenObject(auth: string) {
        return {
            [this.authTokenKey]: auth
        }
    }

}