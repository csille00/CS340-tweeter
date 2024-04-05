import { LoadUserItemsResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import { UserItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {FollowService} from "../model/service/FollowService";
import {AuthToken, Status, User} from "tweeter-shared";

export const handler = async (event: UserItemsRequest) => {
    try{
        let authToken = AuthToken.fromJson(JSON.stringify(event.token))
        if(authToken === null){throw new Error("[AuthError] authToken not found")}

        let user = User.fromJson(JSON.stringify(event.user))
        if(user === null){ throw new Error("[Bad Request] user not found")}

        let deserializedLastItem = null
        if(event.lastItem !== null){
            deserializedLastItem = User.fromJson(JSON.stringify(event.lastItem))
        }
        const resp = await new FollowService().loadMoreFollowees(authToken, user, event.pageSize, deserializedLastItem)

        if(resp === undefined){
            throw new Error("[Not Found] user items not found");
        }

        return new LoadUserItemsResponse(true, resp[0], resp[1], "Load more followees returned successfully")
    }  catch (e){
        console.log(e)
        return new TweeterResponse(false, (e as Error).message)
    }
}