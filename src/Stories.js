import React from 'react';
import { useFetch } from './hooks';
function Stories() {
  // const [stories, setStories] = useState([]);

  const { response, loading, error } = useFetch(
    'https://news-proxy-server.appspot.com/topstories',
    []
  );

  const stories = response;
  const renderStories = stories.map(({ id, by, time, title, url }) => {
    // console.log(stories)
    // const { id, by, time, title, url } = story;

    return (
      <div key={id}>
        <a href={url}>{title}</a>
        <div>
          {by} - {new Date(time * 1000).toLocaleString()}
        </div>
      </div>
    );
  });

  return (
    <div className="Stories">
      <h1>Top Stories</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {renderStories}
    </div>
  );
}

export default Stories;
