import {StatusService} from "../model/StatusService";
import {AuthToken, Status, User} from "tweeter-shared";

export interface PostStatusView {
    setPost: (post: string) => void
    displayInfoMessage: (
        message: string,
        duration: number,
        bootstrapClasses?: string
    ) => void;
    displayErrorMessage: (err: string) => void
    clearLastInfoMessage: () => void;
}

export class PostPresenter {
    private service: StatusService;
    private view: PostStatusView;

    public constructor(view: PostStatusView) {
        this.view = view;
        this.service = new StatusService()
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
        try {
            this.view.displayInfoMessage("Posting status...", 0);

            await this.postStatus(auth!, new Status(post, user!, Date.now()));

            this.view.clearLastInfoMessage();
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to post the status because of exception: ${error}`
            );
        }
    };


}