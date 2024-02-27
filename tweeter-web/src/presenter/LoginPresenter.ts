import {UserService} from "../model/UserService";
import {NavigateFunction} from "react-router-dom";
import {AuthToken, User} from "tweeter-shared";
import {Presenter, View} from "./Presenter";
import {UserItemView} from "./UserItemPresenter";

export interface LoginView extends View {
    setAlias: (alias: string) => void;
    setPassword: (password: string) => void;
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;
    navigate: NavigateFunction
}

export class LoginPresenter extends Presenter {
    private service: UserService

    public constructor(view: LoginView) {
        super(view);
        this.service = new UserService();
    }

    protected get view(): LoginView {
        return super.view as LoginView;
    }

    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl: string | undefined)  {
        await this.doFailureReportingOperation(async () => {
            let [user, authToken] = await this.service.login();
            this.view.updateUserInfo(user, user, authToken, rememberMe);

            if (!!originalUrl) {
                this.view.navigate(originalUrl);
            } else {
                this.view.navigate("/");
            }
        }, "log user in")
    };
}