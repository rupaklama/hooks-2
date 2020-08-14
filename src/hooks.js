import { useState, useEffect } from 'react';
import axios from 'axios';

// declare custom hook - useFetch
// two params which are two unique things between two components - Joke & Stories
// url is unique & useState's initialValue
export const useFetch = (url, initialValue) => {

 const [result, setResult] = useState(initialValue);

 useEffect(() => {
  const query = async () => {
   const { data } = await axios.get(url);
   setResult(data);
  };
  query();
  // eslint-disable-next-line
 }, []);

 // returning main result at the end of this function,
 // this func will take url argument & initialValue arg & return fetched data
 return result;

}

// Hooks are great for avoiding code duplication across your app. 
// Something we do a lot is to fetch data.

// It can fetch data
// It returns a loading state
// It returns an error state