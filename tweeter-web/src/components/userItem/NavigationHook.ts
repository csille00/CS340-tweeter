import useToastListener from "../toaster/ToastListenerHook";
import React, {useState} from "react";
import useUserInfoHook from "../userInfo/UserInfoHook";
import {NavigationPresenter, NavigationView} from "../../presenter/NavigationPresenter";

interface NavHook {
    navigateToUser: (event: React.MouseEvent) => Promise<void>;
}

const useNavigationHook = (): NavHook => {

    const { displayErrorMessage } = useToastListener();
    const { setDisplayedUser, currentUser, authToken } = useUserInfoHook();

    const listener: NavigationView = {
        displayErrorMessage: displayErrorMessage,
        setDisplayedUser: setDisplayedUser
    }

    const [presenter] = useState(new NavigationPresenter(listener))

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
        await presenter.navigateToUser(authToken, event.target.toString(), currentUser)
    };

    return { navigateToUser: navigateToUser }
}

export default useNavigationHook;