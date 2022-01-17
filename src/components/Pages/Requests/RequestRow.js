import BlackButton from "../../Elements/BlackButton";
import Delete from "../../Elements/Delete";
import "../Row.module.css";
import { useContext, useState } from "react";
import DataContext from "../../../context/data-context";
import ReducerContext from "../../../context/reducer-context";
import axios from "axios";
import Send from "../../Elements/Send";
import qs from "querystring";
import ErrorContext from "../../../context/error-context";

const RequestRow = (props) => {
  const request = props.td;
  const data_ctx = useContext(DataContext);
  const reducer_ctx = useContext(ReducerContext);
  const err_ctx = useContext(ErrorContext);

  const [connection, setConnection] = useState("new");

  const authoriseHandler = async () => {
    const response = await axios({
      url: "https://eline-api.herokuapp.com/xero-auth",
      method: "POST",
      data: qs.stringify({
        request_id: request["_id"],
        tenant_id: connection,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.data.status === 200) {
      window.open(response.data.data, "_blank");
    } else {
      err_ctx.setError(response.data.error);
    }
  };

  let status = <BlackButton onClick={authoriseHandler}>authorise</BlackButton>;
  let rowColour;
  switch (request["status"]) {
    case "authorise":
      status = <BlackButton onClick={authoriseHandler}>authorise</BlackButton>;
      rowColour = "purple";
      break;

    case "pending":
      status = "pending";
      rowColour = "orange";
      break;

    case "success":
      status = "success";
      rowColour = "green";
      break;

    case "failed":
      status = "failed";
      rowColour = "red";
      break;

    case "expired":
      status = "expired";
      rowColour = "red";
      break;
    default:
  }

  const getInfoHandler = () => {
    const data = data_ctx["requests"]["data"].find((req) => req["_id"] === request["_id"]);
    reducer_ctx.dispatch({ type: "REQUEST_INFO", data: data });
  };

  return (
    <>
      <tr onClick={getInfoHandler} className={rowColour}>
        <td>
          <strong>{request["contact"]["company"]["company"]}</strong>
        </td>
        <td>
          {request["contact"]["first_name"]} {request["contact"]["last_name"]}
        </td>
        <td>{request["contact"]["email"]}</td>
        {request["status"] === "pending" ? <Send request={request} /> : <td></td>}
        <td>
          {request["status"] === "authorise" ? (
            <select
              value={connection}
              onChange={(e) => {
                setConnection(e.target.value);
              }}
            >
              <option value={"new"}>new connection</option>
              {data_ctx["connections"]["data"].map((connection) => {
                return (
                  <option key={connection["_id"]} value={connection["tenantId"]}>
                    {connection["tenantName"]}
                  </option>
                );
              })}
            </select>
          ) : (
            <p>{request["tenant"]["name"]}</p>
          )}
        </td>
        <td>{status}</td>
        <Delete item={request} url="requests" />
      </tr>
    </>
  );
};

export default RequestRow;
