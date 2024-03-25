import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {UserService} from "../model/service/UserService";
import {LogoutRequest} from "tweeter-shared/dist/model/net/Request";

export const handler = async (event: LogoutRequest): Promise<TweeterResponse | undefined> => {
        await new UserService().doLogout(event.token);
        return new TweeterResponse(true)
}