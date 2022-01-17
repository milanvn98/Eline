import "./App.css";

import { Redirect, Route, Switch } from "react-router-dom";
import Admin from "./components/Pages/Admin";
import EmployeeApplication from "./components/emp-app/EmployeeApplication";
import EmployerRequest from "./components/emp-app/EmployerRequest";
import Portal from "./components/authentication/Portal";
import { useContext } from "react";
import AuthContext from "./context/auth-context";

function App() {
  const auth_context = useContext(AuthContext);
  const isLoggedIn = auth_context.isLoggedIn;

  return (
    <>
      <Switch>
        <Route path="/employee-application" exact>
          <EmployeeApplication />
        </Route>
        <Route path="/employer-request" exact>
          <EmployerRequest />
        </Route>
        <Route path="/login" exact>
          <Portal method={"login"}></Portal>
        </Route>
        <Route path="/signup" exact>
          <Portal method={"signup"}></Portal>
        </Route>
        <Route path="/" exact>
          {!isLoggedIn ? <Redirect to="/login" /> : <Admin />}
        </Route>
        <Route path='*'>
          <Redirect to={'/'}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
