import {UserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {FollowCountResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async(event: UserRequest) => {
    try {
        const resp = await new UserService().getFollowersCount(event.token, event.user);
        return new FollowCountResponse(true, "FollowerCountLambda Suceesfully returned", resp);
    } catch (error) {
        // Create a more detailed error message. Consider the security implications.
        const errorMessage = `Error fetching follower count for user ${event.user}. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
        return new TweeterResponse(false, errorMessage);
    }
}