import {FollowerStatusRequest, GetUserRequest, UserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {
    FollowerStatusResponse,
    TweeterResponse
} from "tweeter-shared/dist/model/net/Response";
import {AuthToken, User} from "tweeter-shared";

export const handler = async(event: FollowerStatusRequest)=> {

    let authToken = AuthToken.fromJson(JSON.stringify(event.token))
    if(authToken === null){throw new Error("[AuthError] authToken not found")}

    let user = User.fromJson(JSON.stringify(event.user))
    if(user === null){ throw new Error("[Bad Request] user not found")}

    let selectedUser = User.fromJson(JSON.stringify(event.selectedUser))
    if(selectedUser === null){ throw new Error("[Bad Request] user not found")}
    try {
        const resp = await new UserService().getIsFollowerStatus(authToken, user, selectedUser)
        if (resp === undefined) {
            throw new Error("[Not Found] Follow status not found");
        }
        return new FollowerStatusResponse(true, "GetIsFollowerStatus Suceesfully returned", resp);
    } catch (e){
        console.log(e)
        return new TweeterResponse(false, (e as Error).message)
    }
}