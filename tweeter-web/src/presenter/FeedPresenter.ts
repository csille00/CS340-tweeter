import {AuthToken, Status, User} from "tweeter-shared";
import {StatusService} from "../model/StatusService";
import {StatusItemPresenter, StatusItemView} from "./StatusItemPresenter";
import {UserItemView} from "./UserItemPresenter";
import {PAGE_SIZE} from "./PagedItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
    protected getItemDescription(): string {
        return "load more feed items";
    }

    protected async getMoreItems(auth: AuthToken, user: User): Promise<[Status[], boolean]> {
        return await this.service.loadMoreFeedItems(auth, user, PAGE_SIZE, this.lastItem)
    }
}