import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {UserService} from "../model/service/UserService";
import {LogoutRequest, PostStatusRequest} from "tweeter-shared/dist/model/net/Request";
import {StatusService} from "../model/service/StatusService";

export const handler = async (event: PostStatusRequest): Promise<TweeterResponse | undefined> => {
        await new StatusService().postStatus(event.token, event.status);
        return new TweeterResponse(true, "status posted succesfully")
}