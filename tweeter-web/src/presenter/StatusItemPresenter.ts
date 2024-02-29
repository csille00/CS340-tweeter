import {Status} from "tweeter-shared";
import {View} from "./Presenter";
import {PagedItemPresenter} from "./PagedItemPresenter";
import {StatusService} from "../model/StatusService";

export abstract class StatusItemPresenter extends PagedItemPresenter<Status, StatusService> {
    public createService(): StatusService {
        return new StatusService();
    }
}