import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import useUserInfoHook from "../../../src/components/userInfo/UserInfoHook";
import "@testing-library/jest-dom"
import "@testing-library/user-event"
import "isomorphic-fetch"
import {anyNumber, anything, instance, mock, spy, verify} from "ts-mockito";
import {AuthToken, Status, User} from "tweeter-shared";
import {PostPresenter, PostStatusView} from "../../../src/presenter/PostPresenter";
import {ServerFacade} from "../../../src/model/net/ServerFacade";
import {UserService} from "../../../src/model/UserService";
import {StatusService} from "../../../src/model/StatusService";
import {AppNavbarPresenter, AppNavbarView} from "../../../src/presenter/AppNavbarPresenter";


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

    // Login a user. [This can be done by directly accessing the ServerFacade or client side service class]
    // Post a status from the user to the server by calling the "post status" operation on the relevant Presenter.
    //     Verify that the "Successfully Posted!" message was displayed to the user.
    //     Retrieve the user's story from the server to verify that the new status was correctly appended to the user's
    //     story, and that all status details are correct. [This can be done by directly accessing the
    //     ServerFacade or client side service class]

    it("login and post status", async () => {
        const userService = new UserService();
        // const user = new User("first", "last", "@cat", "");
        const user = await userService.login("@testyMctesterson", "password");
        expect(user[0]).toBeInstanceOf(User);
        expect(user[1]).toBeInstanceOf(AuthToken);

        const mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);

        const PostPresenterSpy = spy(new PostPresenter(mockPostStatusViewInstance));
        const postPresenter = instance(PostPresenterSpy);
        await postPresenter.submitPost(user[1], "test", user[0])

        const statusService = new StatusService();
        const story = await statusService.loadMoreStoryItems(user[1], user[0], 10, null);

        expect(story[0][0]).toBeInstanceOf(Status);
        expect(story[0][0].post).toEqual("test");
        expect(story[0][0].user.alias).toEqual(user[0].alias);

        verify(PostPresenterSpy.submitPost(user[1], "test", user[0])).once();

        // verify(mockPostStatusViewInstance.displayInfoMessage).once()
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
    })


    // it("When first rendered the Post Status and Clear buttons are both disabled", () => {
    //     const { postArea, postButton, clearButton, user } = renderLoginAndGetElements();
    //     expect(postButton).toBeDisabled();
    //     expect(clearButton).toBeDisabled();
    // })
    // it("Both buttons are enabled when the text field has text.", async () => {
    //     const { postArea, postButton, clearButton, user } = renderLoginAndGetElements();
    //     await user.type(postArea, "post")
    //
    //     expect(postButton).toBeEnabled();
    //     expect(clearButton).toBeEnabled();
    // })
    // it("Both buttons are disabled when the text field is cleared.", async() => {
    //     const { postArea, postButton, clearButton, user } = renderLoginAndGetElements();
    //     expect(postButton).toBeDisabled();
    //     expect(clearButton).toBeDisabled();
    //
    //     await user.type(postArea, "post")
    //     expect(postButton).toBeEnabled();
    //     expect(clearButton).toBeEnabled();
    //
    //     await user.clear(postArea);
    //     expect(postButton).toBeDisabled();
    //     expect(clearButton).toBeDisabled();
    // })
    // it("The presenter's postStatus method is called with correct parameters when the Post Status button is pressed", async() => {
    //     const mockPresenter = mock<PostPresenter>();
    //     const mockPresenterInstance = instance(mockPresenter);
    //
    //     const { postArea, postButton, clearButton, user } = renderLoginAndGetElements();
    //
    //     await user.type(postArea,"some post")
    //     await user.click(postButton);
    //
    //     verify(mockPresenter.submitPost(useUserInfoHook().authToken, "some post", useUserInfoHook().currentUser))
    // })
})

const renderPostStatus = () => render(<MemoryRouter><PostStatus/></MemoryRouter>);

const renderLoginAndGetElements = () => {
    const user = userEvent.setup();
    renderPostStatus();
    const postArea = screen.getByLabelText("post-text-box");
    const postButton = screen.getByLabelText("post-button");
    const clearButton = screen.getByLabelText("clear-button")
user
    return { postArea, postButton, clearButton, user}
}
