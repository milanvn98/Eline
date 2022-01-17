import styles from "../Page.module.css";
import { useContext } from "react";
import DataContext from "../../../context/data-context";
import ReducerContext from "../../../context/reducer-context";
import InfoCard from "../../Elements/InfoCard";

const Connections = (props) => {
  const data_ctx = useContext(DataContext);
  const reducer_cx = useContext (ReducerContext)
  const info = props.info

  return <>
      <div className={styles.relative}>
          <InfoCard>
              <p>{info['id']}</p>
          </InfoCard>
      </div>
  </>;
};

export default Connections;
