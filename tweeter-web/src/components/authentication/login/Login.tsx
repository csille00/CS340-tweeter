import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfoHook from "../../userInfo/UserInfoHook";
import {LoginPresenter} from "../../../presenter/LoginPresenter";
import {AuthenticationView} from "../../../presenter/AuthenticationPresenter";

interface Props {
  originalUrl?: string;
  presenter?: LoginPresenter;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfoHook();
  const { displayErrorMessage } = useToastListener();

  const listener: AuthenticationView = {
    setAlias: setAlias,
    setPassword: setPassword,
    displayErrorMessage: displayErrorMessage,
    updateUserInfo: updateUserInfo,
    navigate: navigate
  }

  const [presenter] = useState(props.presenter ?? new LoginPresenter(listener))

  const rememberMeRef = useRef(rememberMe);
  rememberMeRef.current = rememberMe;

  const checkSubmitButtonStatus = (): boolean => !alias || !password;

  const doLogin = async () => await presenter.doLogin(alias, password, rememberMe, props.originalUrl);

  const inputFieldGenerator = () => <AuthenticationFields setAlias={setAlias} setPassword={setPassword}/>

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      submit={doLogin}
    />
  );
};

export default Login;
