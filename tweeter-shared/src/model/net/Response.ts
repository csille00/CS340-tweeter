import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";

export class TweeterResponse {
    private _success: boolean;
    private _message: string | null;

    constructor(success: boolean, message: string | null = null) {
        this._success = success;
        this._message = message;
    }

    get success() { return this._success; }

    get message() { return this._message; }
}

interface ResponseJson {
    _success: boolean;
    _message: string;
}

export class AuthenticateResponse extends TweeterResponse {
    private _user: User;
    private _token: AuthToken;

    constructor(
        success: boolean,
        user: User,
        token: AuthToken,
        message: string | null = null
    ) {
        super(success, message);
        this._user = user;
        this._token = token;
    }

    get user() {
        return this._user;
    }

    get token() {
        return this._token;
    }

    static fromJson(json: JSON): AuthenticateResponse {
        interface AuthenticateResponseJson extends ResponseJson {
            _user: JSON;
            _token: JSON;
        }

        const jsonObject: AuthenticateResponseJson =
            json as unknown as AuthenticateResponseJson;
        const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

        if (deserializedUser === null) {
            throw new Error(
                "AuthenticateResponse, could not deserialize user with json:\n" +
                JSON.stringify(jsonObject._user)
            );
        }

        const deserializedToken = AuthToken.fromJson(
            JSON.stringify(jsonObject._token)
        );

        if (deserializedToken === null) {
            throw new Error(
                "AuthenticateResponse, could not deserialize token with json:\n" +
                JSON.stringify(jsonObject._token)
            );
        }

        return new AuthenticateResponse(
            jsonObject._success,
            deserializedUser,
            deserializedToken,
            jsonObject._message
        );
    }
}

export class FollowCountResponse extends TweeterResponse {
    private _number: number;

    get number() {
        return this._number;
    }

    set number(value) {
        this._number = value;
    }

    constructor(success: boolean, message: string | null = null, number: number) {
        super(success, message);
        this._number = number;
    }

    static fromJson(json: JSON) {
        interface FollowCountResponseJson extends ResponseJson {
            _number: JSON;
        }

        const jsonObject: FollowCountResponseJson = json as unknown as FollowCountResponseJson;
        const numberValue = Number(jsonObject._number);
        if (isNaN(numberValue)) {
            throw new Error("Invalid number value in JSON");
        }

        return new FollowCountResponse(
            jsonObject._success,
            jsonObject._message,
            numberValue
        )
    }
}
export class GetUserResponse extends TweeterResponse {
    private _user: User | null;

    constructor(success: boolean, message: string | null = null, user: User | null) {
        super(success, message);
        this._user = user;
    }

    get user(): User | null {
        return this._user;
    }

    set user(value: User | null) {
        this._user = value;
    }

    static fromJson(json: JSON) {
        interface GetUserJson extends ResponseJson {
            _user: JSON;
        }

        const jsonObject: GetUserJson = json as unknown as GetUserJson;

        const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

        if (deserializedUser === null) {
            throw new Error(
                "AuthenticateResponse, could not deserialize user with json:\n" +
                JSON.stringify(jsonObject._user)
            );
        }

        return new GetUserResponse(
            jsonObject._success,
            jsonObject._message,
            deserializedUser
        )
    }
}

export class FollowerStatusResponse extends TweeterResponse {
    private _status: boolean

    constructor(success: boolean, message: string | null = null, status: boolean) {
        super(success, message);
        this._status = status;
    }

    get status(): boolean {
        return this._status;
    }

    set status(value: boolean) {
        this._status = value;
    }

    static fromJson(json: JSON){

        interface FollowerStatusJson extends ResponseJson {
            _status: JSON;
        }

        const jsonObject: FollowerStatusJson = json as unknown as FollowerStatusJson;
        const status = Boolean(jsonObject._status);
        // if (isBoolean(numberValue)) {
        //     throw new Error("Invalid number value in JSON");
        // }

        return new FollowerStatusResponse(
            jsonObject._success,
            jsonObject._message,
            status
        )
    }
}