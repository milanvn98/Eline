import '../Row.module.css'
import Delete from "../../Elements/Delete";
import { useContext } from 'react';
import ReducerContext from "../../../context/reducer-context";
import DataContext from "../../../context/data-context";
import Send from '../../Elements/Send';

const ClientRow = (props) => {
  const client = props.td;
  const reducer_ctx = useContext(ReducerContext)
  const data_ctx = useContext(DataContext)

  const getInfoHandler = () => {
    const data = data_ctx["clients"]["data"].find((cli) => cli["_id"] === client["_id"]) 
    reducer_ctx.dispatch({ type: "CLIENT_INFO", data: data});
  };

  return (
    <>
      <tr onClick={getInfoHandler}>
        <td>
          <strong>{client["company"]}</strong>
        </td>
        <td>
          {client["first_name"]} {client["last_name"]}
        </td>
        <td>{client["email"]}</td>
        <td>{client["phone"]}</td>
        <Send client={client}></Send>
        <td>{client["requests"]}</td>
        <Delete item={client} url={'clients'} />
      </tr>
    </>
  );
};

export default ClientRow;
