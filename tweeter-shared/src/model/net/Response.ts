import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";
import {Status} from "../domain/Status";
import {LoadMoreStatusResponse} from "./garettResponse";

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
    private _count: number

    get count(): number {
        return this._count;
    }

    constructor(success: boolean, message: string | null = null, count: number) {
        super(success, message);
        this._count = count;
    }

    static fromJson(json: JSON): FollowCountResponse {
        interface CountResponseJson extends ResponseJson {
            _count: number;
        }

        const jsonObject: CountResponseJson =
            json as unknown as CountResponseJson;

        return new FollowCountResponse(
            jsonObject._success,
            jsonObject._message,
            jsonObject._count
        );
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

export class FollowResponse extends TweeterResponse {
    private _followersCount: number
    private _followeesCount: number

    get followersCount(): number {
        return this._followersCount;
    }

    get followeesCount(): number {
        return this._followeesCount;
    }

    constructor(success: boolean, followersCount: number, followeesCount: number, message: string | null = null) {
        super(success, message);
        this._followersCount = followersCount;
        this._followeesCount = followeesCount;
    }

    static fromJson(json: JSON): FollowResponse {
        interface FollowResponseJson extends ResponseJson {
            _followersCount: number;
            _followeesCount: number;
        }

        const jsonObject: FollowResponseJson =
            json as unknown as FollowResponseJson;

        return new FollowResponse(
            jsonObject._success,
            jsonObject._followersCount,
            jsonObject._followeesCount,
            jsonObject._message
        );
    }
}

export class LoadStatusResponse extends TweeterResponse {
    private _statusItems: Status[]
    private _hasMoreItems: boolean

    constructor(success: boolean, _statusItems: Status[], _hasMoreItems : boolean, message: string | null = null) {
        super(success, message);
        this._statusItems = _statusItems;
        this._hasMoreItems = _hasMoreItems
    }


    get statusItems(): Status[] {
        return this._statusItems;
    }

    get hasMoreItems(): boolean {
        return this._hasMoreItems;
    }

    static fromJson(json: JSON){
        interface LoadStatusResponseJson extends ResponseJson {
            _statusItems: Status[];
            _hasMoreItems: boolean;
        }

        const jsonObject: LoadStatusResponseJson = json as unknown as LoadStatusResponseJson

        let deserializedStatuses = jsonObject._statusItems.map((status) => Status.fromJson(JSON.stringify(status)))
        if (deserializedStatuses === null){
            throw new Error (
                "StoryItemsResponse, could not deserialize statuses with json:\n" +
                JSON.stringify(jsonObject._statusItems)
            )
        }
        return new LoadMoreStatusResponse(
            jsonObject._success,
            deserializedStatuses.map((status) => status!).filter((status) => status !== null) as Status[],
            jsonObject._hasMoreItems,
            jsonObject._message
        )
    }
}

export class LoadUserItemsResponse extends TweeterResponse {
    private _userItems: User[]
    private _hasMoreItems: boolean

    constructor(success: boolean, _userItems: User[], _hasMoreItems : boolean, message: string | null = null) {
        super(success, message);
        this._userItems = _userItems;
        this._hasMoreItems = _hasMoreItems
    }


    get userItems(): User[] {
        return this._userItems;
    }

    get hasMoreItems(): boolean {
        return this._hasMoreItems;
    }

    static fromJson(json: JSON){
        interface LoadUserItemsResponseJson extends ResponseJson {
            _userItems: User[];
            _hasMoreItems: boolean;
        }


        const jsonObject: LoadUserItemsResponseJson = json as unknown as LoadUserItemsResponseJson

        let deserializedUsers = jsonObject._userItems.map((user) => User.fromJson(JSON.stringify(user)))
        if (deserializedUsers === null){
            throw new Error (
                "UserItemsResponse, could not deserialize users with json:\n" +
                JSON.stringify(jsonObject._userItems)
            )
        }
        return new LoadUserItemsResponse(
            jsonObject._success,
            deserializedUsers.map((user) => user!).filter((user) => user !== null) as User[],
            jsonObject._hasMoreItems,
            jsonObject._message
        )
    }
}


