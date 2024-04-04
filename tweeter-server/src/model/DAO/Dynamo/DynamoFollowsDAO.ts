import {FollowsDAO} from "../interface/FollowsDAO";
import {DataPage, User} from "tweeter-shared";
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
    readonly followerHandle = "follower_handle";
    readonly followeeHandle = "followee_handle";
    readonly followerName = "follower_name";
    readonly followeeName = "followee_name";

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());
    async deleteFollower(follower: User, followee: User): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: {
                [this.followerHandle]: follower.alias,
                [this.followeeHandle]: followee.alias
            },
        };
        await this.client.send(new DeleteCommand(params))
    }

    async getFollower(follower: User, followee: User): Promise<User | undefined> {

        const params = {
            TableName: this.tableName,
            Key: {
                [this.followerHandle]: follower.alias,
                [this.followeeHandle]: followee.alias
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
            KeyConditionExpression: this.followerHandle + " = :loc",
            ExpressionAttributeValues: {
                ":loc": followerHandle,
            },
            TableName: this.tableName,
            IndexName: this.indexName, // Use the secondary index
            Limit: limit,
            ExclusiveStartKey:
                lastFollowee === null
                    ? undefined
                    : {
                        [this.followeeHandle]: lastFollowee.alias,
                        [this.followerHandle]: followerHandle,
                    },
        };

        const items: User[] = [];
        const data: QueryCommandOutput = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) => {
            const newFollower = User.fromJson(JSON.stringify(item[this.followerHandle]))
            if(newFollower !== null){
                items.push(newFollower)
            }
        });

        return new DataPage<User>(items, hasMorePages);

    }

    async getPageOfFollowers(followeeHandle: string, lastFollower: User | null, limit: number = 5): Promise<DataPage<User>> {
        const params = {
            KeyConditionExpression: this.followeeHandle + " = :loc",
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
                        [this.followerHandle]: lastFollower.alias,
                        [this.followeeHandle]: followeeHandle,
                    },
        };

        const items: User[] = [];
        const data: QueryCommandOutput = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) => {
            const newFollowee = User.fromJson(JSON.stringify(item[this.followeeHandle]))
            if(newFollowee !== null){
                items.push(newFollowee)
            }
        });

        return new DataPage<User>(items, hasMorePages);
    }


    async insertFollower(follower: User, followee: User): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.followerHandle]: follower.alias,
                [this.followeeHandle]: followee.alias,
                [this.followerName]: follower.name,
                [this.followeeName]: followee.name
            },
        };

        await this.client.send(new PutCommand(params))

    }


    private generateFollowersItems(follower: User) {

    }

}