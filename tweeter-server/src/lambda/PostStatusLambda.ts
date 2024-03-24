import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {UserService} from "../model/service/UserService";
import {LogoutRequest, PostStatusRequest} from "tweeter-shared/dist/model/net/Request";
import {StatusService} from "../model/service/StatusService";

export const handler = async (event: PostStatusRequest): Promise<TweeterResponse> => {
    try {
        await new StatusService().postStatus(event.token, event.status);
        return new TweeterResponse(true)
    } catch (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error posting status. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}