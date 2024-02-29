import {User} from "tweeter-shared";
import {PagedItemPresenter} from "./PagedItemPresenter";
import {FollowService} from "../model/FollowService";

export abstract class UserItemPresenter extends PagedItemPresenter<User, FollowService> {
    public createService(): FollowService {
        return new FollowService();
    }
}