import {AuthToken, User} from "tweeter-shared";
import {UserItemPresenter} from "./UserItemPresenter";
import {PAGE_SIZE} from "./PagedItemPresenter";

export class FollowersPresenter extends UserItemPresenter {
    protected getItemDescription(): string {
        return "load follower items";
    }

    protected async getMoreItems(auth: AuthToken, user: User): Promise<[User[], boolean]> {
        return await this.service.loadMoreFollowers(auth, user, PAGE_SIZE, this.lastItem);
    }
}