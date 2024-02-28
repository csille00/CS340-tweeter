import {AuthToken, User} from "tweeter-shared";
import {UserService} from "../model/UserService";
import {MessageView, Presenter} from "./Presenter";

export interface UserInfoView extends MessageView {
    setIsFollower: (value: boolean) => void,
    setFolloweesCount: (num: number) => void,
    setFollowersCount: (num: number) => void,
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
    private service: UserService;

    public constructor(view: UserInfoView) {
        super(view);
        this.service = new UserService();
    }

    public async setIsFollowerStatus  (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ){
        await this.doFailureReportingOperation(async () => {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false);
            } else {
                this.view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                );
            }
        }, "determine follower status")
    };

    public async setNumbFollowees (authToken: AuthToken, displayedUser: User){
        await this.doFailureReportingOperation(async () => {
            this.view.setFolloweesCount(await this.service.getFolloweesCount(authToken, displayedUser));
        }, "get followee count")
    };

    public async setNumbFollowers (authToken: AuthToken, displayedUser: User){
        await this.doFailureReportingOperation(async () => {
            this.view.setFollowersCount(await this.service.getFollowersCount(authToken, displayedUser));
        }, "get follower count")
    };

    private async updateFollowState(isFollowOperation: boolean, authToken: AuthToken, user: User) {
        // Pause for demonstration purposes
        await new Promise((f) => setTimeout(f, 2000));

        // Server call placeholder, differentiate based on isFollowOperation if needed
        // if (isFollowOperation) { ... } else { ... }

        let followersCount = await this.service.getFollowersCount(authToken, user);
        let followeesCount = await this.service.getFolloweesCount(authToken, user);

        return [followersCount, followeesCount];
    }

    public async follow(authToken: AuthToken, userToFollow: User) {
        return this.updateFollowState(true, authToken, userToFollow);
    }

    public async unfollow(authToken: AuthToken, userToUnfollow: User) {
        return this.updateFollowState(false, authToken, userToUnfollow);
    }

    private async updateDisplayedUser(isFollowOperation: boolean, authToken: AuthToken|null, displayedUser: User|null) {
        await this.doFailureReportingOperation(async () => {
            const operation = isFollowOperation ? 'Adding' : 'Removing';
            const followerState = isFollowOperation;

            this.view.displayInfoMessage(`${operation} ${displayedUser!.name} to followers...`, 0);

            let [followersCount, followeesCount] = isFollowOperation ?
                await this.follow(authToken!, displayedUser!) :
                await this.unfollow(authToken!, displayedUser!);

            this.view.clearLastInfoMessage();
            this.view.setIsFollower(followerState);
            this.view.setFollowersCount(followersCount);
            this.view.setFolloweesCount(followeesCount);
        }, isFollowOperation ? "follow user" : "unfollow user");
    }

    public async followDisplayedUser(authToken: AuthToken|null, displayedUser: User|null) {
        await this.updateDisplayedUser(true, authToken, displayedUser);
    }

    public async unfollowDisplayedUser(authToken: AuthToken|null, displayedUser: User|null) {
        await this.updateDisplayedUser(false, authToken, displayedUser);
    }
}