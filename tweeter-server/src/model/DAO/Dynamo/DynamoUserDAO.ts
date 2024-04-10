import {UserDAO} from "../interface/UserDAO";
import {User} from "tweeter-shared";
import {DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

export class DynamoUserDAO implements UserDAO{
    tableName = "User"
    private aliasAttribute = "alias"
    private firstNameAttribute = "firstName"
    private lastNameAttribute = "lastName"
    private imageUrlAttribute = "imageUrl"
    private passwordAttribute = "password"
    private followerCountAttribute = "followerCount"
    private followeeCountAttribute = "followeeCount"

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async deleteUser(user: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: {
                alias: user,
            },
        };

        await this.client.send(new DeleteCommand(params));
    }
    async getUserByAlias(alias: String): Promise<[User | undefined, string]> {
        const params = {
            TableName: this.tableName,
            Key: {
                alias,
            },
        };
        const user = await this.client.send(new GetCommand(params))
        return user.Item == undefined
            ? [undefined, ""]
            : [new User(
                user.Item[this.firstNameAttribute],
                user.Item[this.lastNameAttribute],
                user.Item[this.aliasAttribute],
                user.Item[this.imageUrlAttribute],
            ), user.Item[this.passwordAttribute]];
    }

    async insertUser(user: User, passwordHash: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.firstNameAttribute]: user.firstName,
                [this.lastNameAttribute]: user.lastName,
                [this.aliasAttribute]: user.alias,
                [this.imageUrlAttribute]: user.imageUrl,
                [this.passwordAttribute]: passwordHash,
                [this.followerCountAttribute]: 0,
                [this.followeeCountAttribute]: 0,
            },
        };

        await this.client.send(new PutCommand(params));
    }

    async decrementFolloweeCount(alias: string) {
        let followeeCount = await this.getFolloweeCount(alias)
        followeeCount -= 1
        const params = {
            TableName: this.tableName,
            Key: this.generateAliasKey(alias),
            ExpressionAttributeValues: { ":inc": -1},
            UpdateExpression:
                "SET " + this.followeeCountAttribute + " = " + this.followeeCountAttribute + " + :inc",
        };
        await this.client.send(new UpdateCommand(params));
        return followeeCount
    }

    async decrementFollowerCount(alias: string): Promise<number> {
        let followerCount = await this.getFollowerCount(alias)
        followerCount -= 1
        const params = {
            TableName: this.tableName,
            Key: this.generateAliasKey(alias),
            ExpressionAttributeValues: { ":inc": -1},
            UpdateExpression:
                "SET " + this.followerCountAttribute + " = " + this.followerCountAttribute + " + :inc",
        };
        await this.client.send(new UpdateCommand(params));
        return followerCount
    }

    async getFolloweeCount(alias: string): Promise<number> {
        const params = {
            TableName: this.tableName,
            Key: this.generateAliasKey(alias)
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined ? 0 : output.Item[this.followeeCountAttribute]
    }

    async getFollowerCount(alias: string) {
        const params = {
            TableName: this.tableName,
            Key: this.generateAliasKey(alias)
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined ? 0 : output.Item[this.followerCountAttribute]
    }

    async incrementFolloweeCount(alias: string) {
        let followeeCount = await this.getFolloweeCount(alias)
        followeeCount += 1
        const params = {
            TableName: this.tableName,
            Key: this.generateAliasKey(alias),
            ExpressionAttributeValues: { ":inc": 1},
            UpdateExpression:
                "SET " + this.followeeCountAttribute + " = " + this.followeeCountAttribute + " + :inc",
        };
        await this.client.send(new UpdateCommand(params));
        return followeeCount
    }

    async incrementFollowerCount(alias: string) {
        let followerCount = await this.getFollowerCount(alias)
        followerCount += 1
        const params = {
            TableName: this.tableName,
            Key: this.generateAliasKey(alias),
            ExpressionAttributeValues: { ":inc": 1},
            UpdateExpression:
                "SET " + this.followerCountAttribute + " = " + this.followerCountAttribute + " + :inc",
        };
        await this.client.send(new UpdateCommand(params));
        return followerCount
    }

    private generateAliasKey(alias: string) {
        return {
            [this.aliasAttribute]: alias
        }
    }
}