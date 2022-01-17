import React, { useReducer } from "react";
import Client from "../components/Pages/Clients/Client";
import styles from "./reducer.module.css";
import Request from "../components/Pages/Requests/Request";
import Application from "../components/Pages/Applications/Application";
import background from "./clock.png";
import Clock from "../components/Elements/Clock";

const ReducerContext = React.createContext();

export const ReducerContextProvider = (props) => {


  const clock = (
    <div className={styles.clock} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles["timer-container"]}>
        <Clock />
      </div>
    </div>
  );

  const [reducer, dispatchReducer] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "CREATE_REQUEST":
          return { content: <Request /> };

        case "REQUEST_INFO":
          return { content: <Request info={action.data} /> };

        case "CREATE_CLIENT":
          return { content: <Client /> };

        case "CLIENT_INFO":
          return { content: <Client info={action.data} /> };

        case "CREATE_APPLICATION":
          return { content: <Application /> };

        case "APPLICATION_INFO":
          return { content: <Application info={action.data} /> };

        case "LOADING":
          return {
            content: (
              <div className={styles["spinner-container"]}>
                <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
              </div>
            ),
          };

        case "ILLUSTRATION":
          return { content: clock };
        default:
          return { content: clock };
      }
    },
    {
      content: clock,
    }
  );

  return (
    <ReducerContext.Provider
      value={{
        content: reducer.content,
        dispatch: dispatchReducer,
      }}
    >
      {props.children}
    </ReducerContext.Provider>
  );
};

export default ReducerContext;
