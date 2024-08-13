import Card from "../UI/Card";
import classes from "./UnapproveDialog.module.css";

import { useState } from "react";

const UnapproveDialog = ({ onSubmit }) => {
  const [unapproveReasonValue, setUnapproveReasonValue] = useState("");

  const requestReasonChangedHandler = (event) => {
    setUnapproveReasonValue(event.target.value);
  };

  const onSubmitHandler = () => {
    onSubmit(unapproveReasonValue);
  };

  return (
    <div className={classes.background}>
      <div className={classes["form-container"]}>
        <Card>
          <div className={classes.title}>כתוב את סיבת הדחייה</div>
          <input
            type="text"
            value={unapproveReasonValue}
            onChange={requestReasonChangedHandler}
          />
          <button onClick={onSubmitHandler}>דחה בקשה</button>
        </Card>
      </div>
    </div>
  );
};

export default UnapproveDialog;
