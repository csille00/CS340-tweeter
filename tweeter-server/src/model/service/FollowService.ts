import {AuthToken, FakeData, User} from "tweeter-shared";

export class FollowService{
    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
    };

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {

        if (user === null) {
            throw new Error("[Bad Request] user not found");
        }

        if(authToken === null){ //change this to a real authToken check
            throw new Error("[AuthError] invalid token")
        }

        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
    };


}