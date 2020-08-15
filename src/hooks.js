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

// In a real-life project, we might want to do extra stuff when we fetch data.
// Our Hook could be improved by implementing the following features:

// Caching: Before fetching, it’d check in a cache of your choice if data has already been fetched
// and if it needs to be (re)fetched

// Logging error: If there’s an error, it’d dispatch it to a service/third-party application,
// so developers can be aware of them

// React Suspense: The <Suspense> component lets you wait for some code to load and declaratively
// specify a loading state (like a spinner) while you’re waiting.
// It’s great but not recommended yet as it’s an experimental feature so far. See more here.

// Effects: It could dispatch an action to a store, like Redux,
// when it completes or receives an error (an action you’d provide via an onComplete or an onError argument)
