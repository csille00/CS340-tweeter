import {AuthenticationPresenter} from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter {
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