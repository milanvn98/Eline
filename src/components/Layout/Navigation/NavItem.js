import styles from "./NavItem.module.css";

const NavItem = (props) => {
  
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  return (
    <>
      <button onClick={props.onClick} className={styles["nav-button"]}>
        <div className={`${styles["nav-icon-container"]} ${props.active && styles.active}`}>
          <div className={props.active && styles["corner-top"]}></div>
          <div className={props.active && styles["overlay-top"]}></div>
          <div className={props.active && styles["corner-bottom"]}></div>
          <div className={props.active && styles["overlay-bottom"]}></div>
          {props.children}
        </div>
        {props.page && !props.active && (
          <div className={styles["nav-tooltip"]}>
            <p>{toTitleCase(props.page)}</p>
          </div>
        )}
      </button>
    </>
  );
};

export default NavItem;
