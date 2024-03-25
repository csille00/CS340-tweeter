import {
    AuthenticateResponse, FollowerStatusRequest,
    GetUserRequest,
    LoginRequest,
    LogoutRequest,
    RegisterRequest,
    UserRequest
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";
import {
    FollowCountResponse, FollowerStatusResponse,
    FollowResponse,
    GetUserResponse, LoadStatusResponse, LoadUserItemsResponse,
    TweeterResponse
} from "tweeter-shared/dist/model/net/Response";
import {PostStatusRequest, StatusItemsRequest, UserItemsRequest} from "tweeter-shared/dist/model/net/Request";

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

    async getUser(request: GetUserRequest){
        const endpoint = "/user/getUser"
        const response = await this.clientCommunicator.doPost<GetUserRequest>(request, endpoint);

        console.log(response)
        return GetUserResponse.fromJson(response);
    }

    async getFollowerCount(request: UserRequest){
        const endpoint = "/user/getFollowerCount"
        const response = await this.clientCommunicator.doPost<UserRequest>(request, endpoint);

        console.log(response)
        return FollowCountResponse.fromJson(response);
    }

    async getFolloweeCount(request: UserRequest){
        const endpoint = "/user/getFolloweeCount"
        const response = await this.clientCommunicator.doPost<UserRequest>(request, endpoint);

        console.log(response)
        return FollowCountResponse.fromJson(response);
    }

    async getFollowerStatus(request: FollowerStatusRequest){
        const endpoint = "/user/getIsFollowerStatus"
        const response = await this.clientCommunicator.doPost<FollowerStatusRequest>(request, endpoint);

        console.log(response)
        return FollowerStatusResponse.fromJson(response);
    }

    async loadMoreStoryItems(request: StatusItemsRequest){
        const endpoint = "/status/loadMoreStoryItems"
        const response = await this.clientCommunicator.doPost<StatusItemsRequest>(request, endpoint);

        console.log(response)
        return LoadStatusResponse.fromJson(response);
    }

    async loadMoreFeedItems(request: StatusItemsRequest){
        const endpoint = "/status/loadMoreFeedItems"
        const response = await this.clientCommunicator.doPost<StatusItemsRequest>(request, endpoint);

        console.log(response)
        return LoadStatusResponse.fromJson(response);
    }

    async postStatus(request: PostStatusRequest){
        const endpoint = "/status/postStatus"
        const response = await this.clientCommunicator.doPost<PostStatusRequest>(request, endpoint);

        console.log(response)
    }

    async loadMoreFollowers(request: UserItemsRequest){
        const endpoint = "/follow/loadMoreFollowers"
        const response = await this.clientCommunicator.doPost<UserItemsRequest>(request, endpoint);

        console.log(response)
        return LoadUserItemsResponse.fromJson(response);
    }

    async loadMoreFollowees(request: UserItemsRequest){
        const endpoint = "/follow/loadMoreFollowees"
        const response = await this.clientCommunicator.doPost<UserItemsRequest>(request, endpoint);

        console.log(response)
        return LoadUserItemsResponse.fromJson(response);
    }
}
