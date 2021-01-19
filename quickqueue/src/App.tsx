import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { ItemView } from "./components/ItemView";
import { StoreFront } from "./components/StoreFront";
import { RegisterForm } from "./components/RegisterForm";
import { User } from "./models/Users";
import { Payment } from "./components/Payment";
import { Profile } from "./components/Profile";

export const UserContext = React.createContext<any>(undefined);

function App() {
  const [user, changeUser] = useState<User>();

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
                      
            <Route path="/login">
              <LoginForm currentUser={user} updateCurrentUser={changeUser} />
            </Route>

            <Route path="/store">
              <StoreFront />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/register">
              <RegisterForm isCustomer={true} />
            </Route>

            <Route path="/items">
              <ItemView />
            </Route>

            <Route path="/" render={() => <h1>No valid path was chosen double check the url spelling</h1>} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
