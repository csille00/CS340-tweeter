import {NavigateFunction} from "react-router-dom";
import {AuthToken} from "tweeter-shared";

export interface LogoutView {
    displayErrorMessage: (message: string) => void
    displayInfoMessage: (message: string, duration: number) => void
    clearLastInfoMessage: () => void
    clearUserInfo: () => void;
    navigate: NavigateFunction
}

export class LogoutPresenter {
    private view: LogoutView

    public constructor(view: LogoutView) {
        this.view = view
    }

    public async logOut  (authToken: AuthToken|null) {
        this.view.displayInfoMessage("Logging Out...", 0);

        try {
            await this.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
            this.view.navigate("/login");
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user out because of exception: ${error}`
            );
        }
    };

    private async logout (authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };
}