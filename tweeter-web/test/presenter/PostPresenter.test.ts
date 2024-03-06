import {PostPresenter, PostStatusView} from "../../src/presenter/PostPresenter";
import {anything, deepEqual, instance, mock, spy, verify, when} from "ts-mockito";
import {AuthToken, Status, User} from "tweeter-shared";
import {StatusService} from "../../src/model/StatusService";
import "@testing-library/jest-dom"


describe("PostPresenter", () => {
    let mockPostStatusView: PostStatusView;
    let postPresenter: PostPresenter;
    let mockStatusService: StatusService;
    let post: string = "this is a nice hotel";
    const date = new Date(2024, 3, 5);
    const authToken = new AuthToken("abc123", (date.getTime()))
    const user = new User("testy", "mctesterson", "test", "url")

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);

        const postPresenterSpy = spy(new PostPresenter(mockPostStatusViewInstance));
        postPresenter = instance(postPresenterSpy);

        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);
        when(postPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);
    })

    it("tells the view to display a posting status message", async () => {
        await postPresenter.submitPost(authToken, post, user);
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
    })

    it("calls submitPost on the status service with the correct auth token and status string", async () => {
        const originalDateNow = Date.now;
        Date.now = () => date.getTime()

        await postPresenter.submitPost(authToken, post, user);
        const expectedStatus = new Status(post, user, date.getTime());
        verify(mockStatusService.postStatus(authToken, deepEqual(expectedStatus))).once();

        // Restore the original Date.now function after the test
        Date.now = originalDateNow;
    })

    it("tells the view to clear the last info message, clear the post, and display posted message when postingStatus is succesful", async () => {
        await postPresenter.submitPost(authToken, post, user)
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPost("")).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
    })

    it("displays error message and does not clear the post, and display posted message when submit post fails", async () => {
        const error = new Error("An error occurred")
        const originalDateNow = Date.now;
        Date.now = () => date.getTime()

        when(mockStatusService.postStatus(anything(), anything())).thenThrow(error)

        // Call submitPost, which should now use the mocked Date.now and postStatus behavior
        await postPresenter.submitPost(authToken, post, user);

        verify(mockPostStatusView.displayErrorMessage("Failed to post status because of exception: An error occurred")).once()
        verify(mockPostStatusView.clearLastInfoMessage()).never();
        verify(mockPostStatusView.setPost("")).never();
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();

        // Restore the original Date.now function after the test
        Date.now = originalDateNow;
    })
})
