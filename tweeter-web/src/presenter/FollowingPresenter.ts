import {AuthToken, User} from "tweeter-shared";
import {UserItemPresenter} from "./UserItemPresenter";
import {PAGE_SIZE} from "./PagedItemPresenter";

export class FollowingPresenter extends UserItemPresenter {
    protected getItemDescription(): string {
        return "load followee items";
    }

    protected async getMoreItems(auth: AuthToken, user: User): Promise<[User[], boolean]> {
        return await this.service.loadMoreFollowees(auth, user, PAGE_SIZE, this.lastItem);
    }
}