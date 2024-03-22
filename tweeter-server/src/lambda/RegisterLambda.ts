import {AuthenticateResponse, RegisterRequest} from "tweeter-shared";
import {UserService} from "../model/service/UserService";

export const handler = async (event: RegisterRequest): Promise<AuthenticateResponse> =>
    new AuthenticateResponse(true, ...await new UserService().register(event.firstName, event.lastName, event.username, event.password, event.uintArray))
