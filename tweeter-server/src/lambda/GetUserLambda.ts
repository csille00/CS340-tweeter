import {GetUserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {GetUserResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async(event: GetUserRequest)=> {
    const resp = await new UserService().getUser(event.authToken, event.alias)
    if(!resp){
        throw new Error("[Not Found] user not found");
    }
    return new GetUserResponse(true, "getUser returned succesfully", resp);
}