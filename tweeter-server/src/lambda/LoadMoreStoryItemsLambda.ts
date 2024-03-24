import {LoadStatusResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {StatusService} from "../model/service/StatusService";
import {StatusItemsRequest, UserItemsRequest} from "tweeter-shared/dist/model/net/Request";

export const handler = async (event: StatusItemsRequest) => {
    try {
        return new LoadStatusResponse(true, ...await new StatusService().loadMoreStoryItems(event.token, event.user, event.pageSize, event.lastItem))
    } catch  (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error following user ${event.user.alias}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}