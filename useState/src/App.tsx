import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SignUp, ISignUpData } from "./SignUp";

class App extends Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <SignUp onSignUp={this.handleOnSignUp} />
      </div>
    );
  }

  private handleOnSignUp(data: ISignUpData) {
    console.info("SignUpData", data);
    return {
      message: "Congratulations, you have successfully signed up!",
      success: true
    };
  }
}

export default App;
