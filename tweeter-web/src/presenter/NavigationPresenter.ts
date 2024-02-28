import {AuthToken, User} from "tweeter-shared";
import {UserService} from "../model/UserService";
import {Presenter, View} from "./Presenter";
import {UserItemView} from "./UserItemPresenter";

export interface NavigationView extends View{
    setDisplayedUser: (user: User) => void;
}

export class NavigationPresenter extends Presenter<NavigationView> {
    private service: UserService

    public constructor(view: NavigationView) {
        super(view)
        this.service = new UserService()
    }

    private extractAlias = (value: string) => value.substring(value.indexOf("@"));

    public async navigateToUser (auth: AuthToken|null, rawAlias: string, user: User|null): Promise<void> {
        await this.doFailureReportingOperation(async () => {
            let alias = this.extractAlias(rawAlias);
            let user = await this.service.getUser(auth!, alias);

            if (!!user) {
                if (user!.equals(user)) {
                    this.view.setDisplayedUser(user!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        }, "get user")
    };
}