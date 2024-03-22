import {LoginRequest, RegisterRequest} from "tweeter-shared";
import {ClientCommunicator} from "./ClientCommunicator";
import {AuthenticateResponse} from "tweeter-shared/dist/model/net/Response";

export class ServerFacade {

    private SERVER_URL = "TODO: Set this value.";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    async login(request: LoginRequest): Promise<AuthenticateResponse> {
        const endpoint = "/service/login";
        return await this.clientCommunicator.doPost<LoginRequest, AuthenticateResponse>(request, endpoint);
    }

    // async register(request: RegisterRequest) {
    //     const endpoint = "/service/login";
    //     const response: JSON = await this.clientCommunicator.doPost<RegisterRequest, AuthenticateResponse>(request, endpoint);
    //
    //     return AuthenticateResponse.fromJson(response);
    // }
}
