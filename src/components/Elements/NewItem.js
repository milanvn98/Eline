import styles from "./NewItem.module.css";
import { useContext } from "react";
import FilterContext from "../../context/filtered-context";
import ReducerContext from "../../context/reducer-context";
import FilterBar from "./FilterBar";

const NewItem = (props) => {
  const reducer_ctx = useContext(ReducerContext)
  const filter_ctx = useContext(FilterContext);

  const inputChangeHandler = (e) => {
      filter_ctx.filterHandler(e.target.value, props.data);
  };



  return (
    <>
      <div className={styles.container}>
       <div style={{'width': '100%'}}>
          <div
            className={styles["item-container"]}
            onClick={(e) => {
              reducer_ctx.dispatch({ type: "CREATE_" + props.item.toUpperCase() });
            }}
          >
            <h1>{props.item}</h1>
            <div className={styles["icon-container"]}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
          <input
            type="search"
            name="search"
            placeholder="search..."
            className={"search-input"}
            onChange={inputChangeHandler}
          />
          <FilterBar>
          </FilterBar>
       </div>
      </div>
    </>
  );
};

export default NewItem;
