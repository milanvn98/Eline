import styles from "./Delete.module.css";
import { useState, useContext } from "react";
import useHttp from "../../hooks/useHttp";
import DataContext from "../../context/data-context";
import ReducerContext from "../../context/reducer-context";

const Delete = (props) => {
  const data_ctx = useContext(DataContext)
  const reducer_ctx = useContext(ReducerContext)

  const item = props.item;
  const [deletePop, setDeletePop] = useState(false);
  const { sendRequest: deleteItem } = useHttp();
  

  const deleteHandler = () => {
    setDeletePop((previousState) => !previousState);
  };

  const sendDeleteHandler = () => {
    setDeletePop(false);
    deleteItem(
      {
        url: props.url,
        method: "delete",
        ai_id: "60473271b7894100829ea766",
        body: {
          id: item["_id"],
        },
      },
      (response) => {

        reducer_ctx.dispatch({type: 'ILLUSTRATION'})

        data_ctx[props.url].set(prev => {
          const arr = prev.filter(i => i['_id'] !== item['_id'])
          return [...arr]
        })

      }
    );
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
              <p>Are you sure you?</p>
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
