import {UserDAO} from "../interface/UserDAO";
import {User} from "tweeter-shared";
import {DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient, DynamoDBServiceException} from "@aws-sdk/client-dynamodb";

export class DynamoUserDAO implements UserDAO{
    tableName = "User"
    private aliasAttribute = "alias"
    private firstNameAttribute = "firstName"
    private lastNameAttribute = "lastName"
    private imageUrlAttribute = "imageUrl"

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async deleteUser(user: User): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: {
                alias: user.alias,
            },
        };

        try {
            await this.client.send(new DeleteCommand(params));
        } catch (e: DynamoDBServiceException) {
            console.error("Failed to delete user", e);
            throw e; // Rethrow or handle as needed
        }
    }

    async getUserByAlias(alias: String) {
        const params = {
            TableName: this.tableName,
            Key: {
                alias,
            },
        };

        const user = await this.client.send(new GetCommand(params))
        return user.Item == undefined
            ? undefined
            : new User(
                user.Item[this.firstNameAttribute],
                user.Item[this.lastNameAttribute],
                user.Item[this.aliasAttribute],
                user.Item[this.imageUrlAttribute]
            );
    }

    async insertUser(user: User): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.firstNameAttribute]: user.firstName,
                [this.lastNameAttribute]: user.lastName,
                [this.aliasAttribute]: user.alias,
                [this.imageUrlAttribute]: user.imageUrl,
            },
        };

        try {
            await this.client.send(new PutCommand(params));
        } catch (e: DynamoDBServiceException) {
            console.error("Failed to insert user");
            throw e;
        }
    }
}