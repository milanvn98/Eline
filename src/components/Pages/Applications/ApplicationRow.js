import "../Row.module.css";
import Delete from '../../Elements/Delete';
import { useContext } from 'react';
import ReducerContext from "../../../context/reducer-context";
import DataContext from "../../../context/data-context";

const ApplicationRow = (props) => {

    const application = props.td

    const reducer_ctx = useContext(ReducerContext)
    const data_ctx = useContext(DataContext)
  
    const getInfoHandler = () => {
      const data = data_ctx["applications"]["data"].find((app) => app["_id"] === application["_id"]) 
      reducer_ctx.dispatch({ type: "APPLICATION_INFO", data: data});
    };
  return (
    <>
      <tr onClick={getInfoHandler}>
          <td>{application['company']}</td>
          <td>{application['firstName']} {application['lastName']}</td>
          <td>{application['email']}</td>
          <td>{application['jobTitle']}</td>
          <td></td>
          <Delete item={application} url={"applications"} />
      </tr>
    </>
  );
};

export default ApplicationRow;
