import {NavigateFunction} from "react-router-dom";
import {AuthToken} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";
import {UserItemView} from "./UserItemPresenter";

export interface LogoutView extends MessageView {
    clearUserInfo: () => void;
    navigate: NavigateFunction
}

export class LogoutPresenter extends Presenter<LogoutView> {
    public async logOut  (authToken: AuthToken|null) {
        this.view.displayInfoMessage("Logging Out...", 0);
        await this.doFailureReportingOperation(async () => {

            await this.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
            this.view.navigate("/login");
        }, "log user out ")
    };

    private async logout (authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };
}