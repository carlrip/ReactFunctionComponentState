import React, { SFC, ChangeEvent, FormEvent, useReducer } from "react";

export interface ISignUpData {
  firstName: string;
  emailAddress: string;
}
export interface ISignUpResult {
  success: boolean;
  message: string;
}

interface IProps {
  onSignUp: (data: ISignUpData) => ISignUpResult;
}

interface IState {
  firstName: string;
  firstNameError: string;
  emailAddress: string;
  emailAddressError: string;
  submitted: boolean;
  submitResult: ISignUpResult;
}

const defaultState = {
  firstName: "",
  firstNameError: "",
  emailAddress: "",
  emailAddressError: "",
  submitted: false,
  submitResult: {
    success: false,
    message: ""
  }
};

interface IFirstNameChange {
  type: "FIRSTNAME_CHANGE";
  value: string;
}
interface IEmailAddressChange {
  type: "EMAILADDRESS_CHANGE";
  value: string;
}
interface ISubmit {
  type: "SUBMIT";
  firstName: string;
  emailAddress: string;
}

type Actions = IFirstNameChange | IEmailAddressChange | ISubmit;

const validateFirstName = (value: string): string => {
  const error = value ? "" : "You must enter your first name";
  return error;
};

const validateEmailAddress = (value: string): string => {
  const error = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  )
    ? ""
    : "You must enter a valid email address";
  return error;
};

export const SignUp: SFC<IProps> = props => {
  const [state, dispatch] = useReducer((state: IState, action: Actions) => {
    switch (action.type) {
      case "FIRSTNAME_CHANGE":
        return {
          ...state,
          firstName: action.value,
          firstNameError: validateFirstName(action.value)
        };
      case "EMAILADDRESS_CHANGE":
        return {
          ...state,
          emailAddress: action.value,
          emailAddressError: validateEmailAddress(action.value)
        };
      case "SUBMIT":
        debugger;
        const firstNameError = validateFirstName(action.firstName);
        const emailAddressError = validateEmailAddress(action.emailAddress);
        if (firstNameError === "" && emailAddressError === "") {
          const submitResult = props.onSignUp({
            firstName: action.firstName,
            emailAddress: action.emailAddress
          });
          return {
            ...state,
            firstNameError,
            emailAddressError,
            submitted: true,
            submitResult
          };
        } else {
          return {
            ...state,
            firstNameError,
            emailAddressError
          };
        }
      default:
        return state;
    }
  }, defaultState);

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "FIRSTNAME_CHANGE",
      value: e.currentTarget.value
    });
  };

  const handleEmailAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "EMAILADDRESS_CHANGE",
      value: e.currentTarget.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "SUBMIT",
      firstName: state.firstName,
      emailAddress: state.emailAddress
    });
  };

  return (
    <form noValidate={true} onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          value={state.firstName}
          onChange={handleFirstNameChange}
        />
        <span className="error">{state.firstNameError}</span>
      </div>

      <div className="row">
        <label htmlFor="emailAddress">Email address</label>
        <input
          type="text"
          id="emailAddress"
          value={state.emailAddress}
          onChange={handleEmailAddressChange}
        />
        <span className="error">{state.emailAddressError}</span>
      </div>

      <div className="row">
        <button
          type="submit"
          disabled={state.submitted && state.submitResult.success}
        >
          Sign Up
        </button>
      </div>

      {state.submitted && (
        <div className="row">
          <span
            className={
              state.submitResult.success ? "submit-success" : "submit-failure"
            }
          >
            {state.submitResult.message}
          </span>
        </div>
      )}
    </form>
  );
};
