import {AuthToken, User} from "tweeter-shared";
import {UserService} from "../model/UserService";

export interface UserInfoView {
    setIsFollower: (value: boolean) => void,
    setFolloweesCount: (num: number) => void,
    setFollowersCount: (num: number) => void,
    displayErrorMessage: (message: string) => void;
}

export class UserInfoPresenter {
    private service: UserService;
    private view: UserInfoView;

    public constructor(view: UserInfoView) {
        this.service = new UserService();
        this.view = view;
    }

    public async setIsFollowerStatus  (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ){
        try {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false);
            } else {
                this.view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                );
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to determine follower status because of exception: ${error}`
            );
        }
    };

    public async setNumbFollowees (
        authToken: AuthToken,
        displayedUser: User
    ){
        try {
            this.view.setFolloweesCount(await this.service.getFolloweesCount(authToken, displayedUser));
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get followees count because of exception: ${error}`
            );
        }
    };

    public async setNumbFollowers (
        authToken: AuthToken,
        displayedUser: User
    ){
        try {
            this.view.setFollowersCount(await this.service.getFollowersCount(authToken, displayedUser));
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get followers count because of exception: ${error}`
            );
        }
    };

    public async follow (
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        // Pause so we can see the following message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server...is this supposed to be in a service class?

        let followersCount = await this.service.getFollowersCount(authToken, userToFollow);
        let followeesCount = await this.service.getFolloweesCount(authToken, userToFollow);

        return [followersCount, followeesCount];
    };

    public async unfollow (
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        // Pause so we can see the unfollowing message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server...is this supposed to be in a service class?

        let followersCount = await this.service.getFollowersCount(authToken, userToUnfollow);
        let followeesCount = await this.service.getFolloweesCount(authToken, userToUnfollow);

        return [followersCount, followeesCount];
    };

}