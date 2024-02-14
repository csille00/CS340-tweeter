import {UserService} from "../model/UserService";
import useUserInfoHook from "../components/userInfo/UserInfoHook";
import {useNavigate} from "react-router-dom";

export interface LoginView {
    setAlias: (alias: string) => void;
    setPassword: (password: string) => void;
    displayErrorMessage: (meesage: string) => void;
}

export class LoginPresenter {
    private view: LoginView;
    private service: UserService
    private updateUserInfo = useUserInfoHook()
    private navigate = useNavigate();

    public constructor(view: LoginView) {
        this.view = view;
        this.service = new UserService();
    }

    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl: string | undefined)  {
        try {
            let [user, authToken] = await this.service.login();

            this.updateUserInfo.updateUserInfo(user, user, authToken, rememberMe);

            if (!!originalUrl) {
                this.navigate(originalUrl);
            } else {
                this.navigate("/");
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user in because of exception: ${error}`
            );
        }
    };
}