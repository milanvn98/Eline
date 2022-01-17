import React from "react";
import { useState } from "react";

const ErrorContext = React.createContext();

export const ErrorContextProvider = (props) => {
  const [err, setErr] = useState(false);

  const setError = (error) => {
    setErr(error)

    setTimeout(() => {
      setErr(false)
    }, 4000)

  }

  return (
    <ErrorContext.Provider
      value={{
        error: err,
        setError: setError,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
