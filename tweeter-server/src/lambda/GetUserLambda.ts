import {GetUserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {GetUserResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async(event: GetUserRequest)=> {
    try {
        const resp = await new UserService().getUser(event.authToken, event.alias)
        return new GetUserResponse(true, "getUser returned succesfully", resp);
    } catch (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error fetching user for user ${event.alias}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}