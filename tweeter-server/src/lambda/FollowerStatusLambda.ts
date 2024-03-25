import {FollowerStatusRequest, GetUserRequest, UserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {
    FollowerStatusResponse,
    TweeterResponse
} from "tweeter-shared/dist/model/net/Response";

export const handler = async(event: FollowerStatusRequest)=> {
    const resp = await new UserService().getIsFollowerStatus(event.token, event.user, event.selectedUser)
    if(!resp){
        throw new Error("[Not Found] Follow status not found");
    }
    return new FollowerStatusResponse(true, "GetIsFollowerStatus Suceesfully returned", resp);
}