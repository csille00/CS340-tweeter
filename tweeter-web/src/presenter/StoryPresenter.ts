import {AuthToken, Status, User} from "tweeter-shared";
import {StatusItemPresenter} from "./StatusItemPresenter";
import {PAGE_SIZE} from "./PagedItemPresenter";

export class StoryPresenter extends StatusItemPresenter {

    protected getItemDescription(): string {
        return "load more story items";
    }

    protected async getMoreItems(auth: AuthToken, user: User): Promise<[Status[], boolean]> {
        return await this.service.loadMoreStoryItems(auth, user, PAGE_SIZE, this.lastItem)
    }
}