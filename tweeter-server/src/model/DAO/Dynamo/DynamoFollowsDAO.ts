import {FollowsDAO} from "../interface/FollowsDAO";
import {DataPage, Status, User} from "tweeter-shared";
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    QueryCommandOutput
} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

export class DynamoFollowsDAO implements FollowsDAO{
    readonly tableName = "follows";
    readonly indexName = "follows_index";
    readonly followerHandleAttribute = "follower_handle";
    readonly followeeHandleAttribute = "followee_handle";
    readonly followerUserAttribute = "follower_name";
    readonly followeeUserAttribute = "followee_name";

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());
    async deleteFollower(follower: User, followee: User): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: {
                [this.followerHandleAttribute]: follower.alias,
                [this.followeeHandleAttribute]: followee.alias
            },
        };
        await this.client.send(new DeleteCommand(params))
    }

    async getFollower(follower: User, followee: User): Promise<User | undefined> {

        const params = {
            TableName: this.tableName,
            Key: {
                [this.followerHandleAttribute]: follower.alias,
                [this.followeeHandleAttribute]: followee.alias
            }
        };
        const output = await this.client.send(new GetCommand(params));
        if (output.Item === undefined) {
            return undefined;
        } else {
            return undefined; //TODO: fix this
        }
    }


    async getPageOfFollowees(followerHandle: string, lastFollowee: User | null, limit?: number): Promise<DataPage<User>> {

        const params = {
            KeyConditionExpression: this.followerHandleAttribute + " = :loc",
            ExpressionAttributeValues: {
                ":loc": followerHandle,
            },
            TableName: this.tableName,
            Limit: limit,
            ExclusiveStartKey:
                lastFollowee === null
                    ? undefined
                    : {
                        [this.followeeHandleAttribute]: lastFollowee.alias,
                        [this.followerHandleAttribute]: followerHandle,
                    },
        };

        const items: User[] = [];
        const data: QueryCommandOutput = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) => {
            const newFollowerJson = JSON.parse(item[this.followeeUserAttribute])
            if(newFollowerJson !== null){
                items.push(newFollowerJson)
            }
        });

        return new DataPage<User>(items, hasMorePages);

    }

    async getPageOfFollowers(followeeHandle: string, lastFollower: User | null, limit: number = 5): Promise<DataPage<User>> {
        const params = {
            KeyConditionExpression: this.followeeHandleAttribute + " = :loc",
            ExpressionAttributeValues: {
                ":loc": followeeHandle,
            },
            TableName: this.tableName,
            IndexName: this.indexName,
            Limit: limit,
            ExclusiveStartKey:
                lastFollower === null
                    ? undefined
                    : {
                        [this.followerHandleAttribute]: lastFollower.alias,
                        [this.followeeHandleAttribute]: followeeHandle,
                    },
        };

        const items: User[] = [];
        const data: QueryCommandOutput = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) => {
            const newFollowerJson = JSON.parse(item[this.followerUserAttribute])
            if(newFollowerJson !== null){
                items.push(newFollowerJson)
            }
        });

        return new DataPage<User>(items, hasMorePages);
    }


    async insertFollower(follower: User, followee: User): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.followerHandleAttribute]: follower.alias,
                [this.followeeHandleAttribute]: followee.alias,
                [this.followerUserAttribute]: JSON.stringify(follower),
                [this.followeeUserAttribute]: JSON.stringify(followee)
            },
        };

        await this.client.send(new PutCommand(params))

    }


    private generateFollowersItems(follower: User) {

    }

}