import {AuthToken, User} from "tweeter-shared";
import {NavigateFunction} from "react-router-dom";
import {UserService} from "../model/UserService";
import {Buffer} from "buffer";
import {Presenter, View} from "./Presenter";
import {UserItemView} from "./UserItemPresenter";

export interface RegisterView extends View {
    setAlias: (alias: string) => void;
    setPassword: (password: string) => void;
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

export class RegisterPresenter extends Presenter {
    private service: UserService
    private userImageBytes: Uint8Array = new Uint8Array();

    public constructor(view: RegisterView) {
        super(view)
        this.service = new UserService()
    }

    protected get view(): RegisterView {
        return super.view as RegisterView;
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