import httpCommon from "./httpCommon";

export const login = async (email, password) => {
  const response = await httpCommon.post("/login", { email, password });
  const token = response.data.token;

  localStorage.setItem('authToken', token);

  httpCommon.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return response.data;
};

export const logout = async () => {
  await httpCommon.post("/users/logout");
  
  localStorage.removeItem('authToken');

  delete httpCommon.defaults.headers.common["Authorization"];
};

export const logoutAll = async () => {
  await httpCommon.post("/users/logoutAll");

  localStorage.removeItem('authToken');

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

  localStorage.setItem('authToken', token);

  httpCommon.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return response.data;
};

export const changeName = async (email, name) => {
  try {
    await httpCommon.patch("/changeName", { email, name });
    return "שם המשתמש שונה בהצלחה";
  } catch (error) {
    console.log(error);
    return "לא ניתן לשנות שם בשל תקלת מערכת";
  }
};


export const getMe = async () => {
  try {
    const response = await httpCommon.get("/me");
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};