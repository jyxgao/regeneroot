import React from "react";
import LoginForm from "../components/User/LoginForm";
import { Pane } from "evergreen-ui";

const Login = (props) => {
  const isEmpty = (obj) => {
    if (!props.user.email) {
      return true;
    }
    return false;
  };
  console.log(props.user);
  return (
    <Pane>
      {isEmpty(props.user) && (
        <Pane paddingTop={200}>
          <LoginForm login={props.login}/>
        </Pane>
      )}
    </Pane>
  );
};

export default Login;
