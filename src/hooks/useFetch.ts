import React, { useEffect, useState } from 'react';
import returnDummyData from '../dummyData/returnDummyData';

function useFetch<T>(url: string, options?: object) {

  interface State {
    data: T|undefined;
    loading: boolean;
    error: string|undefined;
    statusCode: number|undefined;
  }
  const initialState: State = {
    data: undefined,
    loading: true,
    error: undefined,
    statusCode: undefined
  }

  const [fetchState, setFetchState] = useState<State>(initialState);

  useEffect(() => {
    const abortController = new AbortController();
    let dummyController: undefined|NodeJS.Timeout = undefined;
    if(!url) {
      setFetchState({
        data: undefined,
        loading: false,
        error: undefined,
        statusCode: undefined
      })
      return;
    }
    let updatedState: State = {...fetchState};
    function apiFetch() {
      fetch(url, {signal: abortController.signal, ...options})
      .then((res) => {
        updatedState = {...updatedState, statusCode: res.status};
        if(!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        updatedState = {...updatedState, data: data};
        updatedState = {...updatedState, error: undefined};
        updatedState = {...updatedState, loading: false};
      })
      .catch((err) => {
        if(abortController.signal.aborted) return;
        updatedState = {...updatedState, data: undefined};
        updatedState = {...updatedState, error: err};
        updatedState = {...updatedState, loading: false};
      })
      .finally(() => {
        setFetchState(updatedState);
      })
    }
    function dummyFetch() {
      function getData() {
        let updatedState: State = {...fetchState};
        const data = returnDummyData(url);
        if(!data) {
          updatedState = {...updatedState, data: undefined};
          updatedState = {...updatedState, statusCode: 404};
          updatedState = {...updatedState, error: "Error: Dummy data not found"};
          updatedState = {...updatedState, loading: false};
          setFetchState(updatedState);
          return;
        }
        updatedState = {...updatedState, data: data as T};
        updatedState = {...updatedState, statusCode: 200};
        updatedState = {...updatedState, error: undefined};
        updatedState = {...updatedState, loading: false};
        setFetchState(updatedState);
      }
      dummyController = setTimeout(getData, 500)
    }
    process.env.REACT_APP_KEY ? apiFetch() : dummyFetch();
    setFetchState({...fetchState, loading: true, error: undefined});
    return () => {
      abortController.abort();
      if(dummyController) clearTimeout(dummyController);
    }
  },[url])
  
  return fetchState;
}

export default useFetch;