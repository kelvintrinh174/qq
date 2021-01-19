import React, { SyntheticEvent, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterForm.css";
import logo from "../assets/LogoTemp.png";
import { UserContext } from "../App";
import { User } from "../models/Users";
interface IRegisterProps {
  isCustomer: boolean
}

export const RegisterForm: React.FunctionComponent<IRegisterProps> = (props) => {
  const history = useHistory();


  const [password, changePassword] = useState("");
  const [username, changeUsername] = useState("");
  const [firstName, changeFirstName] = useState("");
  const [lastName, changeLastName] = useState("");
  const [email, changeEmail] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
  };
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeFirstName(e.target.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLastName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeEmail(e.target.value);
  };

  function validateForm() {
    return (
      username.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0
    );
  }

  function goToLogin() {
    history.push("/store");
  }

  const registerNewUser = async (e: SyntheticEvent) => {
    let newUser:User = {
      userId : 0,
      username,
      password,
      firstName,
      lastName,
      email,
      role : (props.isCustomer)?"CUSTOMER":"SHOPPER"
    }

    let requestURL:string = (props.isCustomer)?"http://ec2-18-218-116-207.us-east-2.compute.amazonaws.com:10000/customers/register"
    :"http://ec2-18-218-116-207.us-east-2.compute.amazonaws.com:10000/shoppers/register"
    

    e.preventDefault();

    //send username and password to a remote location to get the user info/auth token
    try {
      axios
        .post(
          requestURL,
          JSON.stringify(newUser),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // let user = res.data;
          // props.updateCurrentUser(user);
          history.push("/login");
        });
    } catch (e) {
      alert("Something went wrong")
    }
  };

  return (
    <form className="registerForm" onSubmit={registerNewUser}>
      <img className="logo" src={logo} alt="Temp Logo" />

      <h2 className="registerHeader">Register for a New Account</h2>

      <div className="firstNameWrapper">
        <label htmlFor="inputFirstName"></label>
        <input
          type="text"
          id="inputFirstName"
          name="inputFirstName"
          placeholder="Enter Your First Name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="lastNameWrapper">
        <label htmlFor="inputLastName"></label>
        <input
          type="text"
          id="inputLastName"
          name="inputLastName"
          placeholder="Enter Your Last Name"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="emailWrapper">
        <label htmlFor="inputEmail"></label>
        <input
          type="email"
          id="inputEmail"
          name="inputEmail"
          placeholder="Enter Your Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="registerWrapper">
        <label htmlFor="inputUsername"></label>
        <input
          type="text"
          id="inputUsername"
          name="inputUsername"
          placeholder="Choose Your Username"
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
          placeholder="Choose Your Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div className="accountTypeWrapper">
        <label htmlFor="inputAccountType">What kind of account would you like to create?</label>
        <select name='inputAccountType'>
          <option value="customer">Customer</option>
          <option value="shopper">Shopper</option>
        </select>
      </div>

      <div className="buttonWrapper">
        <button
          disabled={!validateForm()}
          className="registerButton"
          type="submit"
        >
          Join The Family!
        </button>
      </div>

      <div className="buttonWrapper">
        <button className="loginNavButton" type="button" onClick={goToLogin}>
          Already Have An Account?
        </button>
      </div>
    </form>
  );
};
