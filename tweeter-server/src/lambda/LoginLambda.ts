import {UserService} from "../model/service/UserService";
import {AuthenticateResponse, LoginRequest} from "tweeter-shared";
import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: LoginRequest) => {
    try {
        return new AuthenticateResponse(true, ...await new UserService().login(event.username, event.password))
    } catch  (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error fetching logging in for user ${event.username}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}
