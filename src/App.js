import React, { useState } from 'react';

import Joke from './Joke'
import Stories from './Stories'
import Tasks from './Tasks'
import Gallery from './Gallery'
function App() {

  // const state = useState();
  // const userQuery = state[0];
  // const setUserQuery = state[1];
  // destructuring above
  const [userQuery, setUserQuery] = useState('');

  const searchQuery = () => {
    // allows us to redirect user to a new url using global window object
    // second arg _blank to open in a new tab
    window.open(`https://google.com/search?q=${userQuery}`, '_blank')
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchQuery()
    }
  }
  
  return (
    <div className="App">
      <h1>Hello Rupak</h1>
      <div className='form'>
        <input 
          value={userQuery} 
          onChange={e => setUserQuery(e.target.value)} 
          onKeyPress={handleKeyPress} 
        />
        <button onClick={searchQuery}>Search</button>
      </div>

      <hr />
      <Joke />

      <hr />
      <Tasks />

      <hr />
      <Gallery />
      
      <hr />
      <Stories />

    </div>
  );
}

export default App;
