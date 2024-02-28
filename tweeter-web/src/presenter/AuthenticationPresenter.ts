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

export class AuthenticationPresenter extends Presenter {
    protected service: UserService

    public constructor(view: AuthenticationView) {
        super(view);
        this.service = new UserService();
    }

    protected get view(): AuthenticationView {
        return super.view as AuthenticationView;
    }
}