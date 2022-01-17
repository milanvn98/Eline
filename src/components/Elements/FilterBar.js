import styles from "./FilterBar.module.css";
import BlackButton from "./BlackButton";

const FilterBar = (props) => {
  return (
    <>
      <div className={styles["filter-bar"]}>
        <BlackButton>filter</BlackButton>
        {props.children}
      </div>
    </>
  );
};

export default FilterBar;
