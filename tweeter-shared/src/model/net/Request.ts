import {AuthToken} from "../domain/AuthToken";
import {User} from "../domain/User";
import {Status} from "../domain/Status";

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
    selectedUser: User

    constructor(user: User, token: AuthToken, selectedUser: User) {
        super(user, token);
        this.selectedUser = selectedUser;
    }
}

export class StatusItemsRequest {
    token: AuthToken;
    user: User;
    pageSize: number;
    lastItem: Status | null


    constructor(token: AuthToken, user: User, pageSize: number, lastItem: Status | null) {
        this.token = token;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }
}

export class UserItemsRequest {
    token: AuthToken;
    user: User;
    pageSize: number;
    lastItem: User | null


    constructor(token: AuthToken, user: User, pageSize: number, lastItem: User | null) {
        this.token = token;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }
}

export class PostStatusRequest {
    token: AuthToken;
    status: Status;

    constructor(token: AuthToken, status: Status) {
        this.token = token;
        this.status = status;
    }
}