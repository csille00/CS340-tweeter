import {Presenter, View} from "./Presenter";
import {AuthToken, User} from "tweeter-shared";

export const PAGE_SIZE = 10;

export interface PagedItemView<T> extends View {
    addItems: (items: T[]) => void;
}

export abstract class PagedItemPresenter<T, U> extends Presenter<PagedItemView<T>> {
    private _hasMoreItems = true;
    private _lastItem: T | null = null
    private _service: U;

    public constructor(view: PagedItemView<T>) {
        super(view);
        this._service = this.createService();
    }

    abstract createService(): U;

    protected get service(){return this._service}

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    public set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    public get lastItem(): T | null {
        return this._lastItem;
    }

    public set lastItem(user){
        this._lastItem = user;
    }

    // protected get view(): PagedItemView<T> {
    //     return super.view as PagedItemView<T>
    // }

    public async loadMoreItems (auth : AuthToken | null, user: User | null) {
        await this.doFailureReportingOperation(async () => {
            if (this.hasMoreItems) {
                let [newItems, hasMore] = await this.getMoreItems(auth, user)

                this.hasMoreItems = hasMore;
                this.lastItem = newItems[newItems.length - 1];
                this.view.addItems(newItems);
            }
        }, this.getItemDescription())
    };

    protected abstract getMoreItems(auth: AuthToken | null, user: User | null): Promise<[T[], boolean]>;

    protected abstract getItemDescription(): string;
}