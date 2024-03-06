import {StatusService} from "../model/StatusService";
import {AuthToken, Status, User} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";

export interface PostStatusView extends MessageView {
    setPost: (post: string) => void
}

export class PostPresenter extends Presenter<PostStatusView> {
    private _statusService: StatusService;

    public constructor(view: PostStatusView) {
        super(view)
        this._statusService = new StatusService()
    }


    public get statusService() {
        if (this._statusService == null) {
            this._statusService = new StatusService();
        }
        return this._statusService;
    }

    public async submitPost (auth: AuthToken|null, post: string, user: User|null) {
        await this.doFailureReportingOperation(async () => {
            this.view.displayInfoMessage("Posting status...", 0);

            await this.statusService.postStatus(auth!, new Status(post, user!, Date.now()));

            this.view.clearLastInfoMessage();
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        }, "post status")
    };
}