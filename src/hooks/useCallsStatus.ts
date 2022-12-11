import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';

interface ApiCall {
  data: any;
  loading: boolean;
  error: string|undefined;
  statusCode: number|undefined;
}

function useCallsStatus(apiCalls: Array<ApiCall>, checkDataOnly = false, checkToFirstLoad = false) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    let loading = true;
    let error = false;
    let errorMessage = "";

    if(checkToFirstLoad && !firstLoad) return;

    if(!checkDataOnly) {
      loading = !apiCalls.every((call) => (
        call.loading === false
      ));
    }
    if(checkDataOnly) {
      let statuses: boolean[] = [];
      apiCalls.forEach((call) => {
        if(call.data || call.error) {
          statuses.push(false);
          return;
        }
        statuses.push(true);
      })
      loading = !statuses.every((status) => (
        status === false
      ))
    }
    setLoading(loading);
    if(loading) return;
    if(!loading && firstLoad) setFirstLoad(false);

    apiCalls.forEach((call) => {
      if(call.error) {
        error = true;
        errorMessage = `${call.statusCode} - ${call.error}`;
      }
    })
    setError(error);
    setErrorMessage(errorMessage);
  }, [apiCalls])

  return {loading, error, errorMessage};
}

export default useCallsStatus;