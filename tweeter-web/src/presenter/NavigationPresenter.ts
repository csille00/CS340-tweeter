import {AuthToken, User} from "tweeter-shared";
import {UserService} from "../model/UserService";
import {Presenter, View} from "./Presenter";

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
            let userToDisplay = await this.service.getUser(auth!, alias);

            if (!!userToDisplay && !!user) {
                if (userToDisplay!.equals(user)) {
                    this.view.setDisplayedUser(user!);
                } else {
                    this.view.setDisplayedUser(userToDisplay);
                }
            }
        }, "get user")
    };
}