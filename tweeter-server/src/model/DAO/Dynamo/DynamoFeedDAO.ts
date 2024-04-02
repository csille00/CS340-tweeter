import {FeedDAO} from "../interface/FeedDAO";
import {DataPage, Status, User} from "tweeter-shared";
import {DynamoDBDocumentClient, PutCommand, QueryCommand, QueryCommandOutput} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

export class DynamoFeedDAO implements FeedDAO{
    private aliasAttribute = "alias"
    private timeStampAttribute = "timeStamp"
    private statusAttr = "status"
    private tableName = "Feed"


    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async getUserFeedPage(user: User, lastFeed: Status | null, limit: number): Promise<DataPage<Status>> {
        const params = {
            KeyConditionExpression: this.aliasAttribute + " = :loc",
            ExpressionAttributeValues: {
                ":loc": user.alias,
            },
            TableName: this.tableName,
            Limit: limit,
            ExclusiveStartKey:
                lastFeed === null
                    ? undefined
                    : {
                        [this.timeStampAttribute]: lastFeed.timestamp,
                        [this.aliasAttribute]: user.alias,
                    },
        };

        const items: Status[] = [];
        const data: QueryCommandOutput = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item: Record<string, any>) => {
            const newStatus = Status.fromJson(JSON.stringify(item[this.statusAttr]))
            if(newStatus !== null){
                items.push(newStatus)
            }
        });

        return new DataPage<Status>(items, hasMorePages);
    }

    async postFeed(user: User, feed: Status): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.aliasAttribute]: user.alias,
                [this.timeStampAttribute]: feed.timestamp,
                [this.statusAttr]: JSON.stringify(feed)
            },
        };
        await this.client.send(new PutCommand(params));
    }

    private generateFeedKey(user: User, status: Status) {
        return {
            [this.aliasAttribute]: user.alias,
            [this.timeStampAttribute]: status.timestamp
        };
    }



}