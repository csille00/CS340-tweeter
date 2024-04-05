import {LoadStatusResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {StatusService} from "../model/service/StatusService";
import {StatusItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {AuthToken, Status, User} from "tweeter-shared";

export const handler = async (event: StatusItemsRequest) => {

    let authToken = AuthToken.fromJson(JSON.stringify(event.token))
    if(authToken === null){throw new Error("[AuthError] authToken not found")}

    let user = User.fromJson(JSON.stringify(event.user))
    if(user === null){ throw new Error("[Bad Request] user not found")}

    let deserializedLastItem = null
    if(event.lastItem !== null){
        deserializedLastItem = Status.fromJson(JSON.stringify(event.lastItem))
    }
    try {
        const resp = await new StatusService().loadMoreStoryItems(authToken, user, event.pageSize, deserializedLastItem)
        if(resp === undefined){
            throw new Error("[Not Found] status items not found");
        }
        return new LoadStatusResponse(true, resp[0], resp[1], "LoadStory Returned Succesfully")
    }  catch (e){
        console.log(e)
        return new TweeterResponse(false, (e as Error).message)
    }

}