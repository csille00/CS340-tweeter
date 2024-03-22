import {User} from "../domain/User";
import {AuthToken} from "../domain/AuthToken";

export class AuthenticateResponse {
    user: User
    token: AuthToken

    constructor(user: User, token: AuthToken) {
        this.user = user;
        this.token = token;
    }

}