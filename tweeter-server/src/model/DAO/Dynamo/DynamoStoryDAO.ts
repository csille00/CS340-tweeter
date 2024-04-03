import {StoryDAO} from "../interface/StoryDAO";
import {DataPage, Status, User} from "tweeter-shared";
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    PutCommand,
    QueryCommand,
    QueryCommandOutput
} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient, DynamoDBServiceException} from "@aws-sdk/client-dynamodb";

export class DynamoStoryDAO implements StoryDAO {
    private aliasAttribute = "alias"
    private timeStampAttribute = "timeStamp"
    private statusAttribute = "status"
    private tableName = "Story"

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());
    async deleteStory(story: Status, user: User) {
        const params = {
            TableName: this.tableName,
            Key: this.generatePostKey(story, user),
        };
        try{
            await this.client.send(new DeleteCommand(params));
        } catch (e: DynamoDBServiceException) {
            console.log("Error deleting post from database", e.message)
            throw e;
        }
    }

    async getUserStoryPage(user: User, lastStatus: Status | null, limit: number): Promise<DataPage<Status>> {
        const params = {
            KeyConditionExpression: this.aliasAttribute + " = :loc",
            ExpressionAttributeValues: {
                ":loc": user.alias,
            },
            TableName: this.tableName,
            Limit: limit,
            ExclusiveStartKey:
                lastStatus === null
                    ? undefined
                    : {
                        [this.timeStampAttribute]: lastStatus.timestamp,
                        [this.aliasAttribute]: user.alias,
                    }
        };

        const items: Status[] = [];
        try {
            const data: QueryCommandOutput = await this.client.send(new QueryCommand(params));
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            data.Items?.forEach((item) => {
                const newStatus = Status.fromJson(JSON.stringify(item[this.statusAttribute]))
                if(newStatus !== null){
                    items.push(newStatus)
                }
            })
            return new DataPage<Status>(items, hasMorePages)
        } catch(e: DynamoDBServiceException) {
            console.log("Error retrieving new page of statuses", e.message)
            throw e;
        }
    }

    async postStory(user: User, story: Status): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.aliasAttribute]: user.alias,
                [this.timeStampAttribute]: story.timestamp,
                [this.statusAttribute]: JSON.stringify(story)
            },
        };
        try{
            await this.client.send(new PutCommand(params));
        } catch(e: DynamoDBServiceException){
            console.log("Error posting user story", e.message)
            throw e;
        }
    }

    private generatePostKey(story: Status, user: User) {
        return {
            [this.aliasAttribute]: user.alias,
            [this.statusAttribute]: story.timestamp
        }
    }
}