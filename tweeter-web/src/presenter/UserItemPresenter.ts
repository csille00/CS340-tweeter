import {User} from "tweeter-shared";
import {View} from "./Presenter";
import {PagedItemPresenter} from "./PagedItemPresenter";
import {FollowService} from "../model/FollowService";



export interface UserItemView extends View {
    addItems: (items: User[]) => void;
}
export abstract class UserItemPresenter extends PagedItemPresenter<User, FollowService> {

    public createService(): FollowService {
        return new FollowService();
    }
}