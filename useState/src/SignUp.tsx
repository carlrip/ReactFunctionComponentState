import React, { SFC, ChangeEvent, FormEvent, useState } from "react";

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

export const SignUp: SFC<IProps> = props => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitResult, setSubmitResult]: [
    ISignUpResult,
    (result: ISignUpResult) => void
  ] = useState({ success: false, message: "" });

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
    validateFirstName(e.currentTarget.value);
  };

  const validateFirstName = (value: string): string => {
    const error = value ? "" : "You must enter your first name";
    setFirstNameError(error);
    return error;
  };

  const handleEmailAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.currentTarget.value);
    validateEmailAddress(e.currentTarget.value);
  };

  const validateEmailAddress = (value: string): string => {
    const error = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
      ? ""
      : "You must enter a valid email address";
    setEmailAddressError(error);
    return error;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstNameValidationError = validateFirstName(firstName);
    const emailAddressValidationError = validateEmailAddress(emailAddress);
    if (firstNameValidationError === "" && emailAddressValidationError === "") {
      const result = props.onSignUp({
        emailAddress,
        firstName
      });
      setSubmitResult(result);
      setSubmitted(true);
    }
  };

  return (
    <form noValidate={true} onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <span className="error">{firstNameError}</span>
      </div>

      <div className="row">
        <label htmlFor="emailAddress">Email address</label>
        <input
          type="text"
          id="emailAddress"
          value={emailAddress}
          onChange={handleEmailAddressChange}
        />
        <span className="error">{emailAddressError}</span>
      </div>

      <div className="row">
        <button type="submit" disabled={submitted && submitResult.success}>
          Sign Up
        </button>
      </div>

      {submitted && (
        <div className="row">
          <span
            className={
              submitResult.success ? "submit-success" : "submit-failure"
            }
          >
            {submitResult.message}
          </span>
        </div>
      )}
    </form>
  );
};
