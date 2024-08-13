import { useState, useContext } from "react";
import MainHeader from "../Layout/MainHeader";
import classes from "./ChangeName.module.css";
import Card from "../UI/Card";

import UserContext from "../../context/user-context";
import { changeName } from "../../Services/auth";

const ChangeName = () => {
  const [responseValue, setResponseValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const { email, nameHandler } = useContext(UserContext);

  const nameChangedHandler = (event) => {
    setNameValue(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await changeName(email, nameValue);
    setResponseValue(response);
    if (response === "שם המשתמש שונה בהצלחה") {
      nameHandler(nameValue);
      setNameValue("");
    }
  };

  return (
    <div>
      <MainHeader />
      <div className={classes.title}>שנה שם משתמש!</div>
      <div className={classes["form-container"]}>
        <Card>
          <form onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                id="new-name"
                placeholder="שם משתמש חדש"
                value={nameValue}
                onChange={nameChangedHandler}
                className={classes.input}
              />
            </div>
            <button className={classes.button}>לחצו לשנות את השם</button>
          </form>
        </Card>
        <div className={classes["success-text"]}>{responseValue}</div>
      </div>
    </div>
  );
};

export default ChangeName;
