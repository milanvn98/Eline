import styles from "./Delete.module.css";
import { useState, useContext } from "react";
import DataContext from "../../context/data-context";
import axios from "axios";
import qs from "qs";

const Delete = (props) => {
  const data_ctx = useContext(DataContext);

  const item = props.item;
  const [deletePop, setDeletePop] = useState(false);

  const deleteHandler = () => {
    setDeletePop((previousState) => !previousState);
  };

  const sendDeleteHandler = async () => {
    setDeletePop(false);

    await axios({
      url: "https://eline-api.herokuapp.com/tenants",
      method: "DELETE",
      data: qs.stringify({
        _id: item["_id"],
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    data_ctx[["connections"]].set((prev) => {
      const arr = prev.filter((i) => i["_id"] !== item["_id"]);
      return [...arr];
    });
  };

  return (
    <>
      <td
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`${styles["confirm-container"]} ${deletePop && styles.shown}`}>
          <div>
            <p>
              Are you sure you?
              <br />
              All open requests for this connection will expire.
            </p>
            <div>
              <button className={styles["confirm-button"]} onClick={sendDeleteHandler}>
                Delete
              </button>
              <button className={styles["confirm-button"]} onClick={deleteHandler}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.overlay} ${deletePop && styles["show-overlay"]}`} onClick={deleteHandler}></div>
        <i className={`fas fa-trash ${styles.delete}`} onClick={deleteHandler}></i>
      </td>
    </>
  );
};

export default Delete;
