import {AuthToken, User} from "tweeter-shared";
import {NavigateFunction} from "react-router-dom";
import {UserService} from "../model/UserService";
import {Buffer} from "buffer";

export interface RegisterView {
    setAlias: (alias: string) => void;
    setPassword: (password: string) => void;
    displayErrorMessage: (meesage: string) => void;
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;
    navigate: NavigateFunction
    setImageUrl: (url: string) => void
    setImageBytes: (bytes: Uint8Array) => void
}

export class RegisterPresenter {
    private service: UserService
    private view: RegisterView
    private userImageBytes: Uint8Array

    public constructor(view: RegisterView) {
        this.view = view;
        this.service = new UserService()
    }

    public handleImageFile (file: File | undefined) {
        if (file) {
            this.view.setImageUrl(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const imageStringBase64 = event.target?.result as string;

                // Remove unnecessary file metadata from the start of the string.
                const imageStringBase64BufferContents =
                    imageStringBase64.split("base64,")[1];

                // this.view.setImageBytes(bytes);
                this.userImageBytes = Buffer.from(
                    imageStringBase64BufferContents,
                    "base64"
                );
            };
            reader.readAsDataURL(file);
        } else {
            this.view.setImageUrl("");
            this.view.setImageBytes(new Uint8Array());
        }
    };

    public async doRegister (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        rememberMe: boolean)
    {
        try {
            let [user, authToken] = await this.service.register(
                firstName,
                lastName,
                alias,
                password,
                this.userImageBytes
            );

            this.view.updateUserInfo(user, user, authToken, rememberMe);
            this.view.navigate("/");
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to register user because of exception: ${error}`
            );
        }
    };
}