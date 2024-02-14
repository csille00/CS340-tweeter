import {AuthToken, Status, User} from "tweeter-shared";
import {StatusService} from "../model/StatusService";
import {PAGE_SIZE} from "./FollowersPresenter";
import {StatusItemPresenter, StatusItemView} from "./StatusItemPresenter";

export class StatusItemFeedPresenter extends StatusItemPresenter {
    private service: StatusService;
    private lastItem: Status | null = null;

    public constructor(view: StatusItemView) {
        super(view);
        this.service = new StatusService();
    }

    public async loadMoreItems (auth: AuthToken, displayedUser: User){
        try {
            if (this.hasMoreItems) {
                let [newItems, hasMore] = await this.service.loadMoreFeedItems(auth, displayedUser, PAGE_SIZE, this.lastItem)

                this.hasMoreItems = hasMore;
                this.lastItem = newItems[newItems.length - 1];
                this.view.addItems(newItems);
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to load more feed items because of exception: ${error}`
            );
        }
    };
}