import {AuthToken, Status, User} from "tweeter-shared";
import {StatusService} from "../model/StatusService";
import {PAGE_SIZE} from "./FollowersPresenter";
import {StatusItemPresenter, StatusItemView} from "./StatusItemPresenter";

export class StatusItemStoryPresenter extends StatusItemPresenter {
    private service: StatusService;
    private lastItem: Status | null = null;

    public constructor(view: StatusItemView) {
        super(view);
        this.service = new StatusService();
    }

    public async loadMoreItems (auth: AuthToken, user: User){
        try {
            if (this.hasMoreItems) {
                let [newItems, hasMore] = await this.service.loadMoreStoryItems(auth, user, PAGE_SIZE, this.lastItem)

                this.hasMoreItems = hasMore;
                this.lastItem = newItems[newItems.length - 1];
                this.view.addItems(newItems);
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to load more story items because of exception: ${error}`
            );
        }
    };
}