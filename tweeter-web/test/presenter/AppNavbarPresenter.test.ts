import {AppNavbarPresenter, AppNavbarView} from "../../src/presenter/AppNavbarPresenter";
import {instance, mock, spy, verify, when} from "ts-mockito";
import {AuthToken} from "tweeter-shared";
import {UserService} from "../../src/model/UserService";

describe("AppNavbarPresenter", () => {
    let mockAppNavbarView: AppNavbarView;
    let appNavbarPresenter: AppNavbarPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("abc123", Date.now());

    beforeEach(() => {
        mockAppNavbarView = mock<AppNavbarView>();
        const mockAppNavbarViewInstance = instance(mockAppNavbarView);

        const appNavbarPresenterSpy = spy(new AppNavbarPresenter(mockAppNavbarViewInstance));
        appNavbarPresenter = instance(appNavbarPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService)
        when(appNavbarPresenterSpy.userService).thenReturn(mockUserServiceInstance)
    })

    it("tells the view to display a logging out message", async () => {
        await appNavbarPresenter.logout(authToken);
        verify(mockAppNavbarView.displayInfoMessage("Logging Out...", 0)).once();
    })

    it("calls logout on the user service with the correct auth token", async () => {
        await appNavbarPresenter.logout(authToken);
        verify(mockUserService.doLogout(authToken)).once();
    })
})