import { useState } from "react";
import MainHeader from "../Layout/MainHeader";
import classes from "./ChangeName.module.css";
import Card from "../UI/Card";

const ChangeName = () => {
    const [isNameChanged, setIsNameChanged]= useState(null);
    const [nameValue, setNameValue] = useState('');

    const nameChangedHandler = (event) => {
        setNameValue(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsNameChanged(true);
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
        {isNameChanged === true && (
          <div className={classes["success-text"]}>השם שונה בהצלחה!</div>
        )}
        {isNameChanged === false && (
          <div className={classes["unsuccess-text"]}>קליטת השם נכשלה!</div>
        )}
      </div>
    </div>
  );
};

export default ChangeName;
