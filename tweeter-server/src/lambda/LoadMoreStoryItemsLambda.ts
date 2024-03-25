import {LoadStatusResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {StatusService} from "../model/service/StatusService";
import {StatusItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {Status} from "tweeter-shared";

export const handler = async (event: StatusItemsRequest) => {
    let deserializedLastItem = null
    if(event.lastItem !== null){
        deserializedLastItem = Status.fromJson(JSON.stringify(event.lastItem))
    }
    const resp = await new StatusService().loadMoreStoryItems(event.token, event.user, event.pageSize, deserializedLastItem)

    if(!resp){
        throw new Error("[Not Found] status items not found");
    }

    return new LoadStatusResponse(true, resp[0], resp[1], "LoadStory Returned Succesfully")
}