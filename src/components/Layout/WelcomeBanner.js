import classes from "./WelcomeBanner.module.css";
import { useContext } from "react";
import UserContext from "../../context/user-context";

const WelcomeBanner = () => {
  const { userName } = useContext(UserContext);

  return <div className={classes["welcome-sign"]}>ברוך שובך {userName}!</div>;
};

export default WelcomeBanner;
