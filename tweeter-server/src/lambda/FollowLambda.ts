import {UserService} from "../model/service/UserService";
import {AuthToken, User, UserRequest} from "tweeter-shared";
import {FollowResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: UserRequest) => {

    let authToken = AuthToken.fromJson(JSON.stringify(event.token))
    if(authToken === null){throw new Error("[AuthError] authToken not found")}

    let user = User.fromJson(JSON.stringify(event.user))
    if(user === null){ throw new Error("[Bad Request] user not found")}

    const resp = await new UserService().follow(authToken, user);

    if(resp === undefined){
        throw new Error("[Not Found] Follow error");
    }
    return new FollowResponse(true, resp[0], resp[1], "Follow returned succesfully")
}