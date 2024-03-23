import {UserService} from "../model/service/UserService";
import {AuthenticateResponse, RegisterRequest} from "tweeter-shared";
import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: RegisterRequest) =>{
try{
    return new AuthenticateResponse(true, ...await new UserService().register(event.firstName, event.lastName, event.username, event.password, event.uintArray))
}
catch (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error fetching user count for user ${event.username}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}
