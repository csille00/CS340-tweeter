import {AuthToken, FakeData, Status, User} from "tweeter-shared";

export class StatusService {

    public async loadMoreStoryItems (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    };

    public async loadMoreFeedItems (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    };

    public async postStatus (
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        console.log("posting status")
    };
}