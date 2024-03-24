import {AuthenticateResponse, LoginRequest, LogoutRequest, RegisterRequest, UserRequest} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";
import {FollowResponse, TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export class ServerFacade {

    private SERVER_URL = "https://myz57e2d8f.execute-api.us-west-2.amazonaws.com/dev";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    async login(request: LoginRequest): Promise<AuthenticateResponse> {
        const endpoint = "/user/login";
        const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

        console.log(response)

        return AuthenticateResponse.fromJson(response);
    }

    async register(request: RegisterRequest) {
        const endpoint = "/user/register";
        const response = await this.clientCommunicator.doPost<RegisterRequest>(request, endpoint);

        console.log(response)

        return AuthenticateResponse.fromJson(response);
    }

    async logout(request: LogoutRequest) {
        const endpoint = "/user/logout";
        const response = await this.clientCommunicator.doPost<LogoutRequest>(request, endpoint);

        console.log(response)
    }

    async follow(request: UserRequest) {
        const endpoint = "/user/follow";
        const response = await this.clientCommunicator.doPost<UserRequest>(request, endpoint);

        console.log(response)
        return FollowResponse.fromJson(response);
    }

    async unfollow(request: UserRequest) {
        const endpoint = "/user/unfollow";
        const response = await this.clientCommunicator.doPost<UserRequest>(request, endpoint);

        console.log(response)
        return FollowResponse.fromJson(response);
    }
}
