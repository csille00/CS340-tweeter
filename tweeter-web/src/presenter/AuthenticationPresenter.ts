import {AuthToken, User} from "tweeter-shared";
import {NavigateFunction} from "react-router-dom";
import {Presenter, View} from "./Presenter";
import {UserService} from "../model/UserService";

export interface AuthenticationView extends View {
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

export abstract class AuthenticationPresenter extends Presenter<AuthenticationView> {
    protected service: UserService

    public constructor(view: AuthenticationView) {
        super(view);
        this.service = new UserService();
    }

    protected async doAuthentication(authMethod: () => Promise<[User, AuthToken]>, rememberMe: boolean, originalUrl: string|undefined, authDescription: string){
        await this.doFailureReportingOperation( async () => {
            let [user, authToken] = await authMethod();
            this.view.updateUserInfo(user, user, authToken, rememberMe);

            this.doNavigation(originalUrl)
        }, authDescription)
    }

    protected abstract doNavigation(originalUrl: string | undefined): void;
}