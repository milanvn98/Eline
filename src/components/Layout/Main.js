import styles from "./Main.module.css";
import TopRow from "./TopRow";
import { useContext } from "react";
import NavContext from "../../context/nav-context";
import Window from "./Window";
import DataContext from "../../context/data-context";
import Table from './Table/Table';


const Main = (props) => {
  const nav_ctx = useContext(NavContext);
  const data_ctx = useContext(DataContext);

  let content;
  let table;

  switch (nav_ctx.page) {
    case "requests":
      content = <Window newItem={"Request"} data={ data_ctx["requests"].data} />;
      if (data_ctx["requests"]["data"].length < 1) {
        table =  "Please create a request to begin."
      } else {
        const data = data_ctx["requests"].data.sort((a, b) => (a["contact"]['company'] > b["contact"]['company'] ? 1 : b["contact"]['company'] > a["contact"]['company'] ? -1 : 0))
        const authorise = data.filter(req => req['status'] === 'authorise')
        const pending =  data.filter(req => req['status'] === 'pending')
        const success = data.filter(req => req['status'] === 'success')
        const failed =  data.filter(req => req['status'] === 'failed')
        const expired =  data.filter(req => req['status'] === 'expired')
     
        const tables = [{id: 'Authorise:', data: authorise}, {id: 'Pending:', data: pending}, {id: 'Success:', data: success}, {id: 'Failed:', data: failed}, {id: 'Expired:', data: expired}]

        table = tables.map((table) => {
          return <Table key={Math.random()} rows={table["data"]} client={table['id']}/>;
        });
      }
      break;

    case "clients":
      content = <Window newItem={"Client"} data={ data_ctx["clients"].data} />;
      if (data_ctx["clients"]["data"].length < 1) {
        table = "Please create a client to begin."
      } else {
        table = <Table rows={data_ctx["clients"].data.sort((a, b) => (a["name"] > b["name"] ? 1 : b["name"] > a["name"] ? -1 : 0))}/>
      }
      break;

    case "applications":
      content = <Window newItem={"Application"} />;
      if (data_ctx["clients"]["data"].length < 1) {
        table = "No results Found"
      } else {
        table = <Table rows={data_ctx["applications"].data} />;
      }
      break;

      case "connections":
        content = <Window newItem={"Connection"}/>;
        table = <Table rows={data_ctx['connections']['data']} />
        break;
    default:
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <TopRow>{content}</TopRow>
          <div className={styles["table-container"]}>{table}</div>
        </div>
      </div>
    </>
  );
};

export default Main;
