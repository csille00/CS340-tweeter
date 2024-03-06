import {NavigateFunction} from "react-router-dom";
import {AuthToken} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";
import {UserService} from "../model/UserService";

export interface AppNavbarView extends MessageView {
    clearUserInfo: () => void;
    navigate: NavigateFunction
}

export class AppNavbarPresenter extends Presenter<AppNavbarView> {
    private _userService: UserService | null = null;

    public get userService() {
        if(this._userService == null){
            this._userService = new UserService();
        }
        return this._userService;
    }

    public async logout (authToken: AuthToken|null) {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation(async () => {
            await this.userService.doLogout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
            this.view.navigate("/login");
        }, "log user out")
    };
}