import { useState, useCallback, useContext } from "react";
import axios from "axios";
import qs from "qs";
import ErrorContext from "../context/error-context";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const err_ctx = useContext(ErrorContext);

  const sendRequest = useCallback(
    async (requestConfig, callback) => {
      setIsLoading(true);
      setError(false);

      try {
      

        const response = await axios({
          url: "https://eline-api.herokuapp.com/" + requestConfig.url + "?timestamp=" + new Date().getTime(),
          method: requestConfig.method ? requestConfig.method : "GET",
          data: qs.stringify(requestConfig.body),
          headers: {
            ai_id: requestConfig.ai_id,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        try {
          callback(response.data, response);
        } catch {
          throw new Error("Could not update all components. Please Refresh page.");
        }
      } catch (error) {
        let message = "Network Error Occured";
        error.message && (message = error.message);
        try {
          error.response.data.error && (message = error.response.data.error);
        } catch {}
        err_ctx.setError(message);
      }

      setIsLoading(false);
    },
    [err_ctx]
  );

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
