import {UserRequest} from "tweeter-shared/dist/model/net/Request";
import {UserService} from "../model/service/UserService";
import {FollowCountResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";
import {AuthToken, User} from "tweeter-shared";

export const handler = async(event: UserRequest)=> {
    try {
        let authToken = AuthToken.fromJson(JSON.stringify(event.token))
        if(authToken === null){throw new Error("[AuthError] authToken not found")}

        let user = User.fromJson(JSON.stringify(event.user))
        if(user === null){ throw new Error("[Bad Request] user not found")}
        const resp = await new UserService().getFolloweesCount(authToken, user)

        if (resp === undefined) {
            throw new Error("[Not Found] Follow count not found");
        }
        return new FollowCountResponse(true, "FolloweeCountLambda Suceesfully returned", resp)
    } catch (e){
        console.log(e)
        return new TweeterResponse(false, (e as Error).message)
    }
}