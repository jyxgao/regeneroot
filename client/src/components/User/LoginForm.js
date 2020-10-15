import React, { useState } from "react";
import { Pane, Button, TextInput, Heading } from "evergreen-ui";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleLogin = (email) => {
    props.login(email);
    history.push("/");
  };

  return (
    <Pane display="flex" flexDirection="column" paddingLeft={200}>
      <Heading size={800} paddingBottom={30}>
        Login
      </Heading>
      <TextInput
        name="email"
        marginBottom={30}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      ></TextInput>
      <TextInput
        name="password"
        marginBottom={30}
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextInput>
      <Button
        className="button--login"
        fontFamily="Poppins"
        width={70}
        onClick={() => handleLogin(email)}
      >
        Login
      </Button>
    </Pane>
  );
};

export default LoginForm;
