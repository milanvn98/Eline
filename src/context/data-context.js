import React from "react";
import useHttp from "../hooks/useHttp";
import { useState, useEffect } from "react";
const DataContext = React.createContext();

export const DataContextProvider = (props) => {
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState([]);
  const [applications, setApplications] = useState([]);
  const [connections, setConnections] = useState([]);

  let { isLoading: requestIsLoading, sendRequest: getRequests, error: requestError } = useHttp();
  let { isLoading: clientIsLoading, sendRequest: getClients, error: clientError } = useHttp();
  let { isLoading: applicationIsLoading, sendRequest: getApplications, error: applicationError } = useHttp();
  let { isLoading: connectionsIsLoading, sendRequest: getConnections, error: connectionError } = useHttp();

  useEffect(() => {

    getRequests(
      {
        url: "requests",
        ai_id: "60473271b7894100829ea766",
      },
      (response) => {
        if(response.status === 200){
          setRequests(response.data);
        } 
      }
    );

    getClients(
      {
        url: "clients",
        ai_id: "60473271b7894100829ea766",
      },
      (response) => {
        if(response.status === 200){
          setClients(response.data);
        } 
      }
    );

    getApplications(
      {
        url: "applications",
        ai_id: "60473271b7894100829ea766",
      },
      (response) => {
        if(response.status === 200){
          setApplications(response.data);
        } 
      }
    );

    getConnections(
      {
        url: "tenants",
        ai_id: "60473271b7894100829ea766",
      },
      (response) => {
        if(response.status === 200){
          setConnections(response.data);
        } 
      }
    );


  }, [ getRequests, getClients, getApplications, getConnections]);

  return (
    <DataContext.Provider
      value={{
        requests: {
          data: requests,
          isLoading: requestIsLoading,
          error: requestError,
          set: setRequests,
        },
        clients: {
          data: clients,
          isLoading: clientIsLoading,
          error: clientError,
          set: setClients,
        },
        applications: {
          data: applications,
          isLoading: applicationIsLoading,
          error: applicationError,
          set: setApplications,
        },
        connections: {
          data: connections,
          isLoading: connectionsIsLoading,
          error: connectionError,
          set: setConnections
        }
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
