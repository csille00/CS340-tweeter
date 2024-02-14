import {AuthToken, User} from "tweeter-shared";
import UserItem from "../components/userItem/UserItem";

export interface UserItemView {
    addItems: (items: User[]) => void;
    displayErrorMessage: (message: string) => void;
}
export abstract class UserItemPresenter {
    private readonly _view: UserItemView;
    private _hasMoreItems = true;

    protected constructor(view: UserItemView) {
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

    public abstract loadMoreItems (auth: AuthToken, displayedUser: User): void
}