import Card from "./Card";
import styles from "./InfoCard.module.css";
import { useContext, useState } from "react";

import NavigationContext from "../../context/nav-context";

const InfoCard = (props) => {
  const nav_ctx = useContext(NavigationContext);

  const [classes, setClasses] = useState(`${styles["info-card"]} ${props.className}`);
  const [expanded, setExpanded] = useState(false);

  const expandHandler = (e) => {
    if (nav_ctx.page === "requests") {
      setClasses(`${styles["info-card"]} ${props.className} ${styles.expand}`);
      setExpanded(true);
    }

    if ( nav_ctx.page === "applications"){
      setClasses(`${styles["info-card"]} ${props.className} ${styles['app-expand']}`);
      setExpanded(true);
    }

     if ( nav_ctx.page === "clients"){
      setClasses(`${styles["info-card"]} ${props.className} ${styles['client-expand']}`);
      setExpanded(true);
    }

  };

  const closeExpandedHandler = () => {
    setClasses(`${styles["info-card"]} ${props.className}`);
    setExpanded(false);
  };

  return (
    <>
      <Card className={classes} onClick={expandHandler}>
        {props.children}
      </Card>
      {expanded && <div className={styles.overlay} onClick={closeExpandedHandler}></div>}
    </>
  );
};

export default InfoCard;
