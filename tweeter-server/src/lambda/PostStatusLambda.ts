import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {UserService} from "../model/service/UserService";
import {LogoutRequest, PostStatusRequest} from "tweeter-shared/dist/model/net/Request";
import {StatusService} from "../model/service/StatusService";
import {AuthToken, Status, User} from "tweeter-shared";

export const handler = async (event: PostStatusRequest): Promise<TweeterResponse | undefined> => {
        let authToken = AuthToken.fromJson(JSON.stringify(event.token))
        if(authToken === null){throw new Error("[AuthError] authToken not found")}

        let status = Status.fromJson(JSON.stringify(event.status))
        if(status === null){throw new Error("[Bad Request] status not found")}

        await new StatusService().postStatus(authToken, status);
        return new TweeterResponse(true, "status posted succesfully")
}