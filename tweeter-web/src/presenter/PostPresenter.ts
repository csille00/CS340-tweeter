import {StatusService} from "../model/StatusService";
import {AuthToken, Status, User} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";
import {UserItemView} from "./UserItemPresenter";

export interface PostStatusView extends MessageView {
    setPost: (post: string) => void
}

export class PostPresenter extends Presenter {
    private service: StatusService;

    public constructor(view: PostStatusView) {
        super(view)
        this.service = new StatusService()
    }

    protected get view(): PostStatusView {
        return super.view as PostStatusView;
    }

    public async postStatus (
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server to post the status
    };

    public async submitPost (auth: AuthToken|null, post: string, user: User|null) {
        await this.doFailureReportingOperation(async () => {
            this.view.displayInfoMessage("Posting status...", 0);

            await this.postStatus(auth!, new Status(post, user!, Date.now()));

            this.view.clearLastInfoMessage();
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        }, "post status")
    };


}