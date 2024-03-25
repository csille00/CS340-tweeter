import {UserService} from "../model/service/UserService";
import {AuthenticateResponse, RegisterRequest} from "tweeter-shared";
import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: RegisterRequest) =>{
    return new AuthenticateResponse(true, ...await new UserService().register(event.firstName, event.lastName, event.username, event.password, event.uintArray))
}
