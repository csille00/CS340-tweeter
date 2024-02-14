import {AuthToken, User} from "tweeter-shared";
import {UserService} from "../model/UserService";

export interface NavigationView {
    displayErrorMessage: (message: string) => void;
    setDisplayedUser: (user: User) => void;
}

export class NavigationPresenter {
    private view: NavigationView
    private service: UserService

    public constructor(view: NavigationView) {
        this.view = view
        this.service = new UserService()
    }

    private extractAlias = (value: string) => value.substring(value.indexOf("@"));

    public async navigateToUser (auth: AuthToken|null, rawAlias: string, currentUser: User|null): Promise<void> {
        try {
            let alias = this.extractAlias(rawAlias);

            let user = await this.service.getUser(auth!, alias);

            if (!!user) {
                if (currentUser!.equals(user)) {
                    this.view.setDisplayedUser(currentUser!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        } catch (error) {
            this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
    };
}