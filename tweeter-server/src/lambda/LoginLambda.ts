import {LoginRequest} from "tweeter-shared";
import {UserService} from "../model/service/UserService";
import {AuthenticateResponse} from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: LoginRequest): Promise<AuthenticateResponse> =>
        new AuthenticateResponse(...await new UserService().login(event.username, event.password))
