import React from "react";
import { useState } from "react";
import styles from "../components/Layout/Navigation/Navigation.module.css";

const NavContext = React.createContext();

export const NavContextProvider = (props) => {
  
  const openActive = { id: "clients" };
  const [active, setActive] = useState({
    active: openActive,
    nav_items: [openActive, { id: "requests" }, {id: 'applications'}],
  });

  const toggleActive = (index) => {
    setActive({ ...active, active: active["nav_items"][index] });
  };

  const toggleActiveStyles = (index) => {
    if (active["nav_items"][index] === active.active) {
      return styles["svg-active"];
    } else {
      return null;
    }
  };

  return (
    <NavContext.Provider
      value={{
        active: active,
        setActive: setActive,
        toggleActive: toggleActive,
        toggleActiveStyles: toggleActiveStyles,
        page: active.active.id,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
