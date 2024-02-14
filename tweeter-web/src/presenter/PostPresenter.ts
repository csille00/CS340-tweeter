import {StatusService} from "../model/StatusService";
import {Status} from "tweeter-shared";

export interface PostStatusView {
    displayInfoMessage: (
        message: string,
        duration: number,
        bootstrapClasses?: string
    ) => void;
    displayErrorMessage: (err: string) => void
}

export class PostPresenter {
    private service: StatusService;
    private view: PostStatusView;

    private constructor(view: PostStatusView) {
        this.view = view;
        this.service = new StatusService()
    }


    // public async submitPost () {
    //     try {
    //         this.view.displayInfoMessage("Posting status...", 0);
    //
    //         let status = new Status(post, currentUser!, Date.now());
    //
    //         await postStatus(authToken!, status);
    //
    //         clearLastInfoMessage();
    //         setPost("");
    //         displayInfoMessage("Status posted!", 2000);
    //     } catch (error) {
    //         displayErrorMessage(
    //             `Failed to post the status because of exception: ${error}`
    //         );
    //     }
    // };


}