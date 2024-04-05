import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {UserService} from "../model/service/UserService";
import {LogoutRequest} from "tweeter-shared/dist/model/net/Request";
import {AuthToken} from "tweeter-shared";

export const handler = async (event: LogoutRequest): Promise<TweeterResponse | undefined> => {

    let authToken = AuthToken.fromJson(JSON.stringify(event.token))
    if(authToken === null){throw new Error("[AuthError] authToken not found")}
    try {
        await new UserService().doLogout(authToken);
        return new TweeterResponse(true)
    } catch (e){
        console.log(e)
        return new TweeterResponse(false, (e as Error).message)
    }
}