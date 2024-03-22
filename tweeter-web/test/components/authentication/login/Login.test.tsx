import Login from "../../../../src/components/authentication/login/Login";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {userEvent} from "@testing-library/user-event/";
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import "@testing-library/jest-dom"
import {LoginPresenter} from "../../../../src/presenter/LoginPresenter";
import {anything, instance, mock, verify} from "ts-mockito";

library.add(fab)
describe("Login Component", () => {
   it("When first rendered the sign-in button is disabled.", () => {
        const { signInButton } = renderLoginAndGetElements("/");
        expect(signInButton).toBeDisabled()
   });

   it("enables the sign-in button if both alias and password fields have text", async () => {
       const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements("/")

       await user.type(aliasField, "a")
       await user.type(passwordField, "b")

       expect(signInButton).toBeEnabled();
   });

   it("disabled the sign in button if either field is cleared", async () => {
       const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements("/")

       await user.type(aliasField, "a")
       await user.type(passwordField, "b")
       expect(signInButton).toBeEnabled();

       await user.clear(aliasField);
       expect(signInButton).toBeDisabled();

       await user.type(aliasField, "g");
       expect(signInButton).toBeEnabled();

       await user.clear(passwordField);
       expect(signInButton).toBeDisabled();
   })

   it("calls the presenters login method with current parameters when the sign in button is pressed", async () => {
       const mockPresenter = mock<LoginPresenter>();
       const mockPresenterInstance = instance(mockPresenter);

       const originalUrl = "http://someurl.com"
       const alias = "somealias"
       const password = "password"

       const { signInButton, aliasField, passwordField, user } =
           renderLoginAndGetElements(originalUrl, mockPresenterInstance);

       await user.type(aliasField, alias)
       await user.type(passwordField, password)
       await user.click(signInButton);

       verify(mockPresenter.doLogin(alias, password, anything(), originalUrl)).once()
   })

});

const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
    return render(
        <MemoryRouter>
            {!!presenter ? (
                <Login originalUrl={originalUrl} presenter={ presenter }/>
            ) : (
                <Login originalUrl={originalUrl}/>
            )}
        </MemoryRouter>
    );
}

const renderLoginAndGetElements = (originalUrl: string, presenter?: LoginPresenter) => {
    const user = userEvent.setup();

    renderLogin(originalUrl, presenter);

    const signInButton = screen.getByRole("button", { name: /Sign in/i });
    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password")

    return { signInButton, aliasField, passwordField, user}
}
