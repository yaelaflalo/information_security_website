import httpCommon from "./httpCommon";

export const login = async (email, password) => {
  const response = await httpCommon.post("/login", { email, password });
  const token = response.data.token;

  httpCommon.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return response.data;
};

export const logout = async () => {
  await httpCommon.post("/users/logout");

  delete httpCommon.defaults.headers.common["Authorization"];
};

export const logoutAll = async () => {
  await httpCommon.post("/users/logoutAll");

  delete httpCommon.defaults.headers.common["Authorization"];
};

export const changePassword = async (email, password) => {
  try {
    await httpCommon.patch("/changePassword", { email, password });
    return "הסיסמא שונתה בהצלחה";
  } catch (error) {
    if (error.response.data.message === "Unable to find user") {
      return "לא קיים משתמש לחשבון המייל שהוכנס";
    } else {
      return "לא ניתן לשנות סיסמא בשל תקלת מערכת";
    }
  }
};

export const signup = async (name, email, password) => {
  const response = await httpCommon.post("/signup", { name, email, password });
  const token = response.data.token;

  httpCommon.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return response.data;
};
