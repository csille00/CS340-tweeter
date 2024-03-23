import {AuthenticateResponse, LoginRequest, LogoutRequest, RegisterRequest} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";
import {TweeterResponse} from "tweeter-shared/dist/model/net/Response";

export class ServerFacade {

    private SERVER_URL = "https://myz57e2d8f.execute-api.us-west-2.amazonaws.com/dev";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    async login(request: LoginRequest): Promise<AuthenticateResponse> {
        const endpoint = "/login";
        const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

        console.log(response)

        return AuthenticateResponse.fromJson(response);
    }

    async register(request: RegisterRequest) {
        const endpoint = "/register";
        const response = await this.clientCommunicator.doPost<RegisterRequest>(request, endpoint);

        console.log(response)

        return AuthenticateResponse.fromJson(response);
    }

    async logout(request: LogoutRequest) {
        const endpoint = "/logout";
        const response = await this.clientCommunicator.doPost<LogoutRequest>(request, endpoint);

        console.log(response)

        return TweeterResponse.fromJson(response);
    }
}
