import {GetUserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {GetUserResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {AuthToken, User} from "tweeter-shared";

export const handler = async(event: GetUserRequest)=> {

    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken))
    if(authToken === null){throw new Error("[AuthError] authToken not found")}

    const resp = await new UserService().getUser(authToken, event.alias)
    if(resp === undefined){
        throw new Error("[Not Found] user not found");
    }
    return new GetUserResponse(true, "getUser returned succesfully", resp);
}