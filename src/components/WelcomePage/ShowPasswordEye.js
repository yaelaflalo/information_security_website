import openEye from "../../assets/openEye.png";
import closeEye from "../../assets/closeEye.png";

import classes from "./ShowPasswordEye.module.css";

const ShowPasswordEye = ({ isPasswordVisible, onClick }) => {
  return (
    <img
      src={isPasswordVisible ? closeEye : openEye}
      alt="show password eye"
      className={classes.eye}
      onClick={onClick}
    />
  );
};

export default ShowPasswordEye;
