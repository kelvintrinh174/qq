import React, { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/LoginForm.css";
import logo from "../assets/LogoTemp.png";
import { User } from "../models/Users";

interface ILoginProps {
  updateCurrentUser: (u: User) => void;
  currentUser: User;
}

export const LoginForm: React.FunctionComponent<ILoginProps> = (props) => {
  const history = useHistory();

  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
  };

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function goToRegister() {
    history.push("/register");
  }

  const submitLogin = async (e: SyntheticEvent) => {
    let credentials = {
      username: username,
      password: password,
    };

    e.preventDefault();

    //send username and password to a remote location to get the user info/auth token
    try {
      axios
        .post(
          "http://ec2-18-218-116-207.us-east-2.compute.amazonaws.com:10000/customers/login",
          JSON.stringify(credentials),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          let user = res.data;
          props.updateCurrentUser(user);
          history.push("/store");
        });
    } catch (e) {
      changePassword("");
    }
  };

  return (
    <form className="loginForm" onSubmit={submitLogin}>
      <img className="logo" src={logo} alt="Temp Logo" />

      <h2 className="loginHeader">Welcome Back!</h2>

      <div className="loginWrapper">
        <label htmlFor="inputUsername"></label>
        <input
          type="text"
          id="inputUsername"
          name="inputUsername"
          placeholder="Enter Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div className="passwordWrapper">
        <label htmlFor="inputPassword"></label>
        <input
          type="password"
          id="inputPassword"
          name="inputPassword"
          placeholder="Enter Your Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div className="buttonWrapper">
        <button
          disabled={!validateForm()}
          className="loginButton"
          type="submit"
        >
          Let's Shop!
        </button>
      </div>

      <div className="buttonWrapper">
        <button
          className="registerNavButton"
          type="button"
          onClick={goToRegister}
        >
          Register for New Account
        </button>
      </div>
    </form>
  );
};
