import styles from "./Navigation.module.css";
import NavItem from "./NavItem";
import { useContext } from "react";
import SVG from "./SVG";
import NavContext from "../../../context/nav-context";
import FilterContext from "../../../context/filtered-context";
import ReducerContext from "../../../context/reducer-context";
import AuthContext from "../../../context/auth-context";

const Navigation = (props) => {
  const auth_ctx = useContext(AuthContext)
  const nav_ctx = useContext(NavContext)
  const filter_ctx = useContext(FilterContext)
  const reducer_ctx = useContext(ReducerContext)

  const logoutHandler = () => {
    auth_ctx.logout()
  }
  return (
    <>
      <nav className={styles["navbar-container"]}>
        <div className={styles["nav-bar"]}>
          <div className={styles.logo}>
            <img src="/images/logo-round.png" alt="Architech Logo" />
          </div>
          {nav_ctx.active["nav_items"].map((item, index) => {
            return (
              <NavItem
                key={item["id"]}
                onClick={() => {
                  filter_ctx.clear()
                  reducer_ctx.dispatch({type: "ILLUSTRATION"})
                  nav_ctx.toggleActive(index);
                }}
                active={nav_ctx.toggleActiveStyles(index)}
                page={item.id}
              >
                <SVG svg={item["id"]} className={nav_ctx.toggleActiveStyles(index)} />
              </NavItem>
            );
          })}
          <NavItem onClick={logoutHandler}>
            <p style={{color: "white"}}>Logout</p>
          </NavItem>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
