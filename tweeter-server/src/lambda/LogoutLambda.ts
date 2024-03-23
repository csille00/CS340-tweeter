import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {UserService} from "../model/service/UserService";
import {LogoutRequest} from "tweeter-shared/dist/model/net/Request";

export const handler = async (event: LogoutRequest): Promise<TweeterResponse> => {
    try {
        await new UserService().doLogout(event.token);
        return new TweeterResponse(true)
    } catch (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error logging out for user. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}