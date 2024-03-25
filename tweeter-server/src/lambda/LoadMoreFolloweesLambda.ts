import { LoadUserItemsResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import { UserItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {FollowService} from "../model/service/FollowService";

export const handler = async (event: UserItemsRequest) => {
    try {
        const resp = await new FollowService().loadMoreFollowees(event.token, event.user, event.pageSize, event.lastItem)
        return new LoadUserItemsResponse(true, resp[0], resp[1], "Load more followees returned successfully")
    } catch  (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error loading followees for ${event.user.alias}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}