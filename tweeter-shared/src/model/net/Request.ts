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

