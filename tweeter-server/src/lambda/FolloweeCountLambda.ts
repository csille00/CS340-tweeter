import {UserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {FollowCountResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async(event: UserRequest)=> {
    const resp = await new UserService().getFolloweesCount(event.token, event.user)
    if(!resp){
        throw new Error("[Not Found] Follow count not found");
    }
    return new FollowCountResponse(true, "FolloweeCountLambda Suceesfully returned", resp)
}