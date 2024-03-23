import {FollowerStatusRequest, GetUserRequest, UserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {
    FollowerStatusResponse,
    TweeterResponse
} from "tweeter-shared/dist/model/net/Response";

export const handler = async(event: FollowerStatusRequest)=> {
    try {
        const resp = await new UserService().getIsFollowerStatus(event.token, event.user, event.selectedUser)
        return new FollowerStatusResponse(true, null, resp);
    } catch (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error fetching follower status for user ${event.user}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}