import {UserService} from "../model/service/UserService";
import {AuthenticateResponse, LoginRequest} from "tweeter-shared";
import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: LoginRequest) => {
    return new AuthenticateResponse(true, ...await new UserService().login(event.username, event.password))
}
