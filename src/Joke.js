import React from 'react';
import { useFetch } from './hooks';

function Joke() {
  // const [joke, setJoke] = useState({});

  // calling imported custom useFetch to fetch data with url arg & initialState
  const { response, loading, error } = useFetch(
    'https://official-joke-api.appspot.com/jokes/random',
    {}
  );

  const joke = response;
  // object destructuring
  const { setup, punchline } = joke;

  return (
    <div>
      <h3>Joke of the session</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      <p>{setup}</p>
      <p>
        <em>{punchline}</em>
      </p>
    </div>
  );
}

export default Joke;
