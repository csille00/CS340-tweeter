import {UserService} from "../model/service/UserService";
import {UserRequest} from "tweeter-shared";
import {FollowResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: UserRequest) => {
    try {
        const resp = await new UserService().follow(event.token, event.user);
        return new FollowResponse(true, resp[0], resp[1], "Follow returned succesfully")
    } catch  (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error following user ${event.user.alias}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}