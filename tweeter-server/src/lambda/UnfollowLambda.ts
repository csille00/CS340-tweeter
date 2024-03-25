import {UserService} from "../model/service/UserService";
import {UserRequest} from "tweeter-shared";
import {FollowResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: UserRequest) => {
    const resp = await new UserService().unfollow(event.token, event.user);

    if(!resp){
        throw new Error("[Not Found] user not found");
    }

    return new FollowResponse(true, resp[0], resp[1], "unfollow returned succesfully")
}