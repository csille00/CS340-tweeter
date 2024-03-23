import {AuthToken} from "../domain/AuthToken";
import {User} from "../domain/User";

export class TweeterRequest {

}

export class LoginRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class RegisterRequest {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    uintArray: Uint8Array
    constructor(username: string, password: string, firstName: string, lastname: string, uintArray: Uint8Array) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastname;
        this.uintArray = uintArray;
    }
}

export class LogoutRequest {
    token: AuthToken

    constructor(token: AuthToken) {
        this.token = token;
    }
}

export class UserRequest {
    user: User;
    token: AuthToken;

    constructor(user: User, token: AuthToken) {
        this.user = user;
        this.token = token;
    }
}

export class GetUserRequest {
    authToken: AuthToken;
    alias: string


    constructor(authToken: AuthToken, alias: string) {
        this.authToken = authToken;
        this.alias = alias;
    }
}

export class FollowerStatusRequest extends UserRequest {
    private selectedUser: User

    constructor(user: User, token: AuthToken, selectedUser: User) {
        super(user, token);
        this.selectedUser = selectedUser;
    }

    get selectedUser(): User {
        return this.selectedUser;
    }

    set selectedUser(value: User) {
        this.selectedUser = value;
    }
}

