import { useState, useEffect } from 'react';
import axios from 'axios';

// declare custom hook - useFetch
// two params which are two unique things between two components - Joke & Stories
// url is unique & useState's initialValue
export const useFetch = (url, initialValue) => {
  // don't have response & error to start with - null
  const [response, setResponse] = useState(initialValue);
  const [error, setError] = useState(null);

  // We want to display a loader in the main component when fetching is occurring.
  // As we did with error handling, let’s add a loading state.
  const [loading, setLoading] = useState(false);

  // What if the request is slow and the component has already unmounted by
  // the time the async request finished? You will get the error:
  // To prevent this memory leak from happening, one solution is to use the useEffect’s
  // Cleanup function in combination with the AbortController built-in object:

  // The AbortController interface represents a controller object that
  // allows you to abort/end one or more Web requests as and when desired.
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const doFetch = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url, initialValue);
        if (!signal.aborted) {
          setResponse(data);
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(e);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
      // A lot of people ignores it, but Try… Catch takes a final statement called finally.
      // finally is executed, no mater if there’s an error or not
    };
    doFetch();

    // clean up function
    return () => {
      abortController.abort();
    }; // eslint-disable-next-line
  }, []);
  return { response, error, loading };
};

// Hooks are great for avoiding code duplication across your app.
// Something we do a lot is to fetch data.

// It can fetch data
// It returns a loading state
// It returns an error state
