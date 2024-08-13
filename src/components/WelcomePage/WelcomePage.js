import classes from "./WelcomPage.module.css";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";

const WelcomePage = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [showForgetPasswordPage, setShowForgetPasswordPage] = useState(false);

  const changeHasAccountStatus = () => {
    setHasAccount(!hasAccount);
    setShowForgetPasswordPage(false);
  };

  const forgetPasswordHandler = () => {
    setShowForgetPasswordPage(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes["right-section"]}>
        <div className={classes.title}>שירותי ביטחון מידע</div>
        <div className={classes.subTitle}>
          אתר שירותי ביטחון מידע מאפשר לכם לעלות בקשות ביטחון מידע ולעקוב אחר
          הסטטוס שלהם.
        </div>
      </div>
      <div className={classes["left-section"]}>
        {!hasAccount && !showForgetPasswordPage && <Signup />}
        {hasAccount && !showForgetPasswordPage && (
          <div>
            <Login />
            <div
              className={classes["forget-password"]}
              onClick={forgetPasswordHandler}
            >
              שכחת סיסמא?
            </div>
          </div>
        )}
        {showForgetPasswordPage && <ForgetPassword />}
        <div
          className={classes["bottom-text"]}
          onClick={changeHasAccountStatus}
        >
          {hasAccount && "צור חשבון חדש"}
          {!hasAccount && "יש לי כבר חשבון!"}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
