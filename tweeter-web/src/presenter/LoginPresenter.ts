import {UserService} from "../model/UserService";
import {NavigateFunction} from "react-router-dom";
import {AuthToken, User} from "tweeter-shared";

export interface LoginView {
    setAlias: (alias: string) => void;
    setPassword: (password: string) => void;
    displayErrorMessage: (meesage: string) => void;
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;
    navigate: NavigateFunction
}

export class LoginPresenter {
    private view: LoginView;
    private service: UserService

    public constructor(view: LoginView) {
        this.view = view;
        this.service = new UserService();
    }

    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl: string | undefined)  {
        try {
            let [user, authToken] = await this.service.login();
            this.view.updateUserInfo(user, user, authToken, rememberMe);

            if (!!originalUrl) {
                this.view.navigate(originalUrl);
            } else {
                this.view.navigate("/");
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user in because of exception: ${error}`
            );
        }
    };
}