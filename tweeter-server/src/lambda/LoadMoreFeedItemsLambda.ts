import {LoadStatusResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {StatusService} from "../model/service/StatusService";
import {StatusItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {AuthToken, Status, User} from "tweeter-shared";

export const handler = async (event: StatusItemsRequest) => {
    try{
        let authToken = AuthToken.fromJson(JSON.stringify(event.token))
        if(authToken === null){throw new Error("[AuthError] authToken not found")}

        let user = User.fromJson(JSON.stringify(event.user))
        if(user === null){ throw new Error("[Bad Request] user not found")}

        let deserializedLastItem = null
        if(event.lastItem !== null){
            deserializedLastItem = Status.fromJson(JSON.stringify(event.lastItem))
        }
        const resp = await new StatusService().loadMoreFeedItems(authToken, user, event.pageSize, deserializedLastItem)

        if(resp === undefined){
            throw new Error("[Not Found] feedItems not found");
        }

        return new LoadStatusResponse(true, resp[0], resp[1], "LoadFeed Returned Succesfully")
    } catch (e){
        console.log(e)
    }
}