import {AuthTokenDAO} from "../interface/AuthTokenDAO";
import {AuthToken} from "tweeter-shared/dist";

import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

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
        await this.client.send(new DeleteCommand(params));
    }

    async getAuthToken(authToken: string): Promise<AuthToken | undefined> {
        const params = {
            TableName: this.tableName,
            Key: this.getAuthToken(authToken),
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined
            ? undefined
            : new AuthToken(
                output.Item[this.authTokenKey],
                output.Item[this.ttlKey],
            );
    }

    async insertAuthToken(authToken: AuthToken): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.authTokenKey]: authToken.token,
                [this.ttlKey]: authToken.timestamp,
            },
        };
        await this.client.send(new PutCommand(params));
    }

    updateAuthToken(authToken: AuthToken): Promise<void> {
        return this.insertAuthToken(authToken)
    }

    private generateAuthTokenObject(auth: string) {
        return {
            [this.authTokenKey]: auth
        }
    }

}