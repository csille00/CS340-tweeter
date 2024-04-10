import {
    BatchWriteCommand,
    BatchWriteCommandInput,
    BatchWriteCommandOutput,
    DynamoDBDocumentClient
} from "@aws-sdk/lib-dynamodb";
import { execSync } from "child_process";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {User} from "tweeter-shared";

export class FollowDaoFillTable {

    private TABLE_NAME = "follows";
    private PRIMARY_KEY = "follower_handle";
    private SORT_KEY = "followee_handle";
    private FOLLOWEE_USER = "followee_user";
    private FOLLOWER_USER = "follower_user";

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async createFollows(followeeAlias: string, followerAliasList: string[]){
        if(followerAliasList.length == 0){
            console.log('zero followers to batch write');
            return;
        }
        else{
            const params = {
                RequestItems: {
                    [this.TABLE_NAME]: this.createPutFollowRequestItems(followeeAlias, followerAliasList)
                }
            }
            await this.client.send(new BatchWriteCommand(params))
                .then(async (resp)=>{
                    await this.putUnprocessedItems(resp, params, 0);
                    return;
                })
                .catch(err => {
                    throw new Error('Error while batchwriting follows with params: ' + params + ": \n" + err);
                });
        }
    }

    private createPutFollowRequestItems(followeeAlias: string, followerAliasList: string[]){
        let follwerAliasList = followerAliasList.map(followerAlias => this.createPutFollowRequest(followerAlias, followeeAlias));
        return follwerAliasList;
    }

    private createPutFollowRequest(followerAlias: string, followeeAlias: string){
        const currentFolloweeUser: User = new User(followeeAlias, followeeAlias, followeeAlias, "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png");
        const currentFollowerUser: User = new User(followerAlias, followerAlias, followerAlias, "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png");
        let item = {
            [this.PRIMARY_KEY]: followerAlias,
            [this.SORT_KEY]: followeeAlias,
            [this.FOLLOWEE_USER]: JSON.stringify(currentFolloweeUser),
            [this.FOLLOWER_USER]: JSON.stringify(currentFollowerUser),
        }
        let request = {
            PutRequest: {
                Item: item
            }
        }
        return request;
    }

    private async putUnprocessedItems(resp: BatchWriteCommandOutput, params: BatchWriteCommandInput, attempts: number){
        if(attempts > 1) console.log(attempts + 'th attempt starting');
           if(resp.UnprocessedItems != undefined){
            let sec = 0.03;
            if (Object.keys(resp.UnprocessedItems).length > 0) {
                console.log(Object.keys(resp.UnprocessedItems[this.TABLE_NAME]).length + ' unprocessed items');
                //The ts-ignore with an @ in front must be as a comment in order to ignore an error for the next line for compiling.
                // @ts-ignore
                params.RequestItems = resp.UnprocessedItems;
                execSync('sleep ' + sec);
                if(sec < 10) sec += 0.1;
                await this.client.send(new BatchWriteCommand(params))
                    .then(async (innerResp) => {
                        if(innerResp.UnprocessedItems != undefined && Object.keys(innerResp.UnprocessedItems).length > 0){
                            params.RequestItems = innerResp.UnprocessedItems;
                            ++attempts
                            await this.putUnprocessedItems(innerResp, params, attempts)
                        }
                    }).catch(err => {
                        console.log('error while batch writing unprocessed items ' + err);
                    });

            }
        }
    }
}