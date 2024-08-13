import Card from "../UI/Card";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";

import { signup } from "../../Services/auth";
import { useContext } from "react";
import UserContext from "../../context/user-context";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isLongerThenFour = (value) => value.length > 4;

const Signup = () => {
  const { loginHandler } = useContext(UserContext);

  const {
    value: nameValue,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

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

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      !passwordIsValid ||
      !enteredEmailIsValid ||
      !enteredNameIsValid ||
      !repasswordIsValid ||
      passwordValue !== repasswordValue
    ) {
      return;
    }

    try {
      const response = await signup(nameValue, emailValue, passwordValue);
      loginHandler(response.user.name, response.user.role, response.user.email);
      navigate("/me");
    } catch (error) {
      console.log(error);
      return;
    }

    resetEmailInput();
    resetNameInput();
    resetPassword();
    resetReassword();
  };

  const nameClasses = nameInputHasError ? "invalid" : "";
  const emailClasses = emailInputHasError ? "invalid" : "";
  const passwordClasses = passwordHasError ? "invalid" : "";
  const repasswordClasses =
    passwordValue !== repasswordValue || repasswordHasError ? "invalid" : "";

  return (
    <Card>
      <form onSubmit={submitHandler} className={classes.form}>
        <div>
          <input
            type="text"
            id="name"
            placeholder="שם פרטי"
            value={nameValue}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            className={classes[nameClasses]}
          />
          {nameInputHasError && (
            <p className={classes["error-text"]}>יש להכניס שם*</p>
          )}
        </div>
        <div>
          <input
            type="text"
            id="email"
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
            type="password"
            id="password"
            placeholder="סיסמא"
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
        <button>הרשמה</button>
      </form>
    </Card>
  );
};

export default Signup;
