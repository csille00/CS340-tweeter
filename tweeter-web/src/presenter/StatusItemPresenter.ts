import {AuthToken, Status, User} from "tweeter-shared";

export interface StatusItemView {
    addItems: (items: Status[]) => void;
    displayErrorMessage: (message: string) => void;
}
export abstract class StatusItemPresenter {
    private readonly _view: StatusItemView;
    private _hasMoreItems = true;

    protected constructor(view: StatusItemView) {
        this._view = view;
    }

    protected get view() {
        return this._view;
    }

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    public set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    public abstract loadMoreItems (auth: AuthToken|null, displayedUser: User|null): void
}