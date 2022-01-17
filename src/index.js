import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ErrorContextProvider } from "./context/error-context";
import { NavContextProvider } from "./context/nav-context";
import { ReducerContextProvider } from "./context/reducer-context";
import { DataContextProvider } from "./context/data-context";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { FilterContextProvider } from "./context/filtered-context";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <NavContextProvider>
        <ErrorContextProvider>
          <ReducerContextProvider>
            <DataContextProvider>
              <FilterContextProvider>
                <App />
              </FilterContextProvider>
            </DataContextProvider>
          </ReducerContextProvider>
        </ErrorContextProvider>
      </NavContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
