import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";
import {UserDto} from "../DTO/UserDto";
import {AuthTokenDto} from "../DTO/AuthTokenDto";

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

export interface AuthenticateResponse extends TweeterResponse {
    readonly user: UserDto;
    readonly token: AuthTokenDto;
}