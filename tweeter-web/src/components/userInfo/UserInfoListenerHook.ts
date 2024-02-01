import {AuthToken, User} from "tweeter-shared";
import useUserInfoHook from "./UserInfoHook";

interface UserInfoListener {
    displayedUser: User | null;
    authToken: AuthToken | null;
    currentUser: User | null;
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;
    clearUserInfo: () => void;
    setDisplayedUser: (user: User) => void;
}

const useUserInfoListener = (): UserInfoListener => {
    const {
        displayedUser,
        authToken,
        currentUser,
        updateUserInfo,
        clearUserInfo,
        setDisplayedUser
    } = useUserInfoHook();

    return {
        displayedUser: displayedUser,
        authToken: authToken,
        currentUser: currentUser,
        updateUserInfo: updateUserInfo,
        clearUserInfo: clearUserInfo,
        setDisplayedUser: setDisplayedUser
    }
}

export default useUserInfoListener;