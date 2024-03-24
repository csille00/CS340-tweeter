import { LoadUserItemsResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import { UserItemsRequest} from "tweeter-shared/dist/model/net/Request";
import {FollowService} from "../model/service/FollowService";

export const handler = async (event: UserItemsRequest) => {
    try {
        return new LoadUserItemsResponse(true, ...await new FollowService().loadMoreFollowers(event.token, event.user, event.pageSize, event.lastItem))
    } catch  (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error loading followers for ${event.user.alias}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}