import Card from "../UI/Card";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";

import { login } from "../../Services/auth";
import { useState, useContext } from "react";
import UserContext from "../../context/user-context";
import ShowPasswordEye from "./ShowPasswordEye";

const isEmail = (value) => value.includes("@");
const isLongerThenFour = (value) => value.length > 4;

const Login = () => {
  const { loginHandler } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!passwordIsValid || !enteredEmailIsValid) {
      return;
    }

    try {
      const response = await login(emailValue, passwordValue);
      loginHandler(response.user.name, response.user.role);
      navigate("/me");
    } catch (error) {
      setIsLoginFailed(true);
      return;
    }

    resetPassword();
    resetEmailInput();
  };

  const changePasswordToVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const emailClasses = emailInputHasError ? "invalid" : "";
  const passwordClasses = passwordHasError ? "invalid" : "";

  return (
    <Card>
      <form onSubmit={submitHandler} className={classes.form}>
        <div>
          <input
            className={classes[emailClasses]}
            id="email"
            placeholder="אימייל"
            type="text"
            value={emailValue}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && (
            <p className={classes["error-text"]}>
              כתובת המייל שהוכנסה לא תקינה*
            </p>
          )}
        </div>
        <div>
          <input
            className={classes[passwordClasses]}
            id="password"
            placeholder="סיסמא"
            type={isPasswordVisible ? "text" : "password"}
            value={passwordValue}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />
          <ShowPasswordEye
            isPasswordVisible={isPasswordVisible}
            onClick={changePasswordToVisibility}
          />
          {passwordHasError && (
            <p className={classes["error-text"]}>
              הסיסמא שהכונסה קצרה מחמש תווים*
            </p>
          )}
        </div>
        <button>התחברות</button>
        {isLoginFailed && (
          <p className={classes.failed}>אימייל או סיסמא שגויים</p>
        )}
      </form>
    </Card>
  );
};

export default Login;
