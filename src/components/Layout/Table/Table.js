import styles from "./Table.module.css";
import { useContext } from "react";
import ClientRow from "../../Pages/Clients/ClientRow";
import NavContext from "../../../context/nav-context";
import DataContext from "../../../context/data-context";
import RequestRow from "../../Pages/Requests/RequestRow";
import ApplicationRow from "../../Pages/Applications/ApplicationRow";
import ConnectionRow from "../../Pages/Connections/ConnectionRow";
import FilterContext from "../../../context/filtered-context";

const Table = (props) => {
  const nav_ctx = useContext(NavContext);
  const data_ctx = useContext(DataContext);
  const filter_ctx = useContext(FilterContext)

  let displayRow;
  let loadingIcon;
  let rows = props.rows;

  if(filter_ctx.filtered){
    rows = filter_ctx.filtered
  }

  try {
    if (data_ctx[nav_ctx.page].isLoading) {
      loadingIcon = (
        <div className={styles["spinner-container"]}>
          <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        </div>
      );
    }
  } catch {}

  switch (nav_ctx.page) {
    case "requests":
      displayRow = rows.map((row) => {
        return <RequestRow key={row["_id"]} td={row} />;
      });
      break;

    case "clients":
      displayRow = rows.map((row) => {
        return <ClientRow key={row["_id"]} td={row} />;
      });
      break;

    case "applications":
      displayRow = rows.map((row) => {
        return <ApplicationRow key={row["_id"]} td={row} />;
      });
      break;

    case "connections":
      displayRow = rows.map(row => {
        return <ConnectionRow key={row['id']} td={row} />
      })
      break
    default:
  }

  return (
    <>
      {!loadingIcon && (
        <div>
          <p className={styles["table-header"]}>{props.client}</p>
          <table className={styles.table}>
            <thead></thead>
            <tbody>{displayRow}</tbody>
          </table>
        </div>
      )}
      {loadingIcon}
    </>
  );
};

export default Table;
