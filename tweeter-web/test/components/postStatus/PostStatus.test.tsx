import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import useUserInfoHook from "../../../src/components/userInfo/UserInfoHook";
import "@testing-library/jest-dom"
import "@testing-library/user-event"
import {instance, mock, verify} from "ts-mockito";
import {AuthToken, User} from "tweeter-shared";
import {PostPresenter} from "../../../src/presenter/PostPresenter";


jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
    ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));

describe("Post Component", () => {

    beforeAll(() => {
        const mockUser = mock<User>();
        const mockAuthtoken = mock<AuthToken>();
        const mockUserInstance = instance(mockUser);
        const mockAuthTokenInstance = instance(mockAuthtoken);

        (useUserInfoHook as jest.Mock).mockReturnValue({
            currentUser: mockUserInstance,
            authToken: mockAuthTokenInstance,
        });
    });

    it("When first rendered the Post Status and Clear buttons are both disabled", () => {
        const { postArea, postButton, clearButton, user } = renderLoginAndGetElements();
        expect(postButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    })
    it("Both buttons are enabled when the text field has text.", async () => {
        const { postArea, postButton, clearButton, user } = renderLoginAndGetElements();
        await user.type(postArea, "post")

        expect(postButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
    })
    it("Both buttons are disabled when the text field is cleared.", async() => {
        const { postArea, postButton, clearButton, user } = renderLoginAndGetElements();
        expect(postButton).toBeDisabled();
        expect(clearButton).toBeDisabled();

        await user.type(postArea, "post")
        expect(postButton).toBeEnabled();
        expect(clearButton).toBeEnabled();

        await user.clear(postArea);
        expect(postButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    })
    it("The presenter's postStatus method is called with correct parameters when the Post Status button is pressed", async() => {
        const mockPresenter = mock<PostPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const { postArea, postButton, clearButton, user } = renderLoginAndGetElements();

        await user.type(postArea,"some post")
        await user.click(postButton);

        verify(mockPresenter.submitPost(useUserInfoHook().authToken, "some post", useUserInfoHook().currentUser))
    })
})

const renderPostStatus = () => render(<MemoryRouter><PostStatus/></MemoryRouter>);

const renderLoginAndGetElements = () => {
    const user = userEvent.setup();
    renderPostStatus();
    const postArea = screen.getByLabelText("post-text-box");
    const postButton = screen.getByLabelText("post-button");
    const clearButton = screen.getByLabelText("clear-button")

    return { postArea, postButton, clearButton, user}
}
