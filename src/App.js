import "./App.css";
import { Route, Routes } from "react-router-dom";
import RequestForm from "./components/Requests/RequestForm";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import PrivatePage from "./components/PrivatePlace/PrivatePage";
import ManagePage from "./components/ManagePlace/ManagePage";
import UserProvider from "./context/UserProvider";
import UnauthorizedPage from "./components/ProtectedRoute/UnauthorizedPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ChangeName from "./components/ChangeName/ChangeName";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/*" element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/me"
          element={
            <ProtectedRoute
              element={<PrivatePage />}
              allowedRoles={["user", "admin"]}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<ManagePage />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/requests/:requestName"
          element={
            <ProtectedRoute
              element={<RequestForm />}
              allowedRoles={["user", "admin"]}
            />
          }
        />
        <Route
          path="/changeName"
          element={
            <ProtectedRoute
              element={<ChangeName />}
              allowedRoles={["user", "admin"]}
            />
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
