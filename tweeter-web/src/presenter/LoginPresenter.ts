import {AuthenticationPresenter} from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter {
    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl: string | undefined)  {
        await this.doAuthentication( async () => this.service.login()
            , rememberMe
            , originalUrl
            , "log user in");
    };

    protected doNavigation(originalUrl: string | undefined): void {
        if (typeof originalUrl === 'string') {
            this.view.navigate(originalUrl);
        } else {
            this.view.navigate("/");
        }
    }
}