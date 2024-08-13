import Card from "../UI/Card";
import classes from "./Signup.module.css";
import useInput from "../../hooks/use-input";
import { useState } from "react";

import { changePassword } from "../../Services/auth";

const isEmail = (value) => value.includes("@");
const isLongerThenFour = (value) => value.length > 4;

const ForgetPassword = () => {
  const {
    value: emailValue,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isLongerThenFour);

  const {
    value: repasswordValue,
    isValid: repasswordIsValid,
    hasError: repasswordHasError,
    valueChangeHandler: repasswordChangedHandler,
    inputBlurHandler: repasswordBlurHandler,
    reset: resetReassword,
  } = useInput(isLongerThenFour);

  const [changePasswordRequestStatus, setChangePasswordRequestStatus] =
    useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      !passwordIsValid ||
      !enteredEmailIsValid ||
      !repasswordIsValid ||
      passwordValue !== repasswordValue
    ) {
      return;
    }

    const requestStatus = await changePassword(emailValue, passwordValue);

    setChangePasswordRequestStatus(requestStatus);

    resetEmailInput();
    resetPassword();
    resetReassword();
  };

  const emailClasses = emailInputHasError ? "invalid" : "";
  const passwordClasses = passwordHasError ? "invalid" : "";
  const repasswordClasses =
    passwordValue !== repasswordValue || repasswordHasError ? "invalid" : "";

  return (
    <Card>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.title}>שכחתי סיסמא!</div>
        <div>
          <input
            id="email"
            type="text"
            placeholder="אימייל"
            value={emailValue}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            className={classes[emailClasses]}
          />
          {emailInputHasError && (
            <p className={classes["error-text"]}>
              כתובת המייל שהוכנסה לא תקינה*
            </p>
          )}
        </div>
        <div>
          <input
            id="password"
            placeholder="סיסמא"
            type="password"
            value={passwordValue}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            className={classes[passwordClasses]}
          />
          {passwordHasError && (
            <p className={classes["error-text"]}>
              הסיסמא שהכונסה קצרה מחמש תווים*
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            id="rePassword"
            placeholder="אימות סיסמא"
            value={repasswordValue}
            onChange={repasswordChangedHandler}
            onBlur={repasswordBlurHandler}
            className={classes[repasswordClasses]}
          />
          {(repasswordHasError || passwordValue !== repasswordValue) && (
            <p className={classes["error-text"]}>
              אימות הסיסמא שהוכנס קצר מחמש תווים או לא תואם*
            </p>
          )}
        </div>
        <div className={classes["forget-password"]}></div>
        <button>עדכן סיסמא</button>
        <p className={classes.failed}>{changePasswordRequestStatus}</p>
      </form>
    </Card>
  );
};

export default ForgetPassword;
