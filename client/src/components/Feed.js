import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Feed() {
  const [tweets, setTweets] = useState([]);
  let query = 'Salibandy';

  useEffect(() => {
    const fetchTweets = async () => {
      const twitterApi = await axios(`/api/twitter/?q=${query}`);
      setTweets(twitterApi.data.statuses);
    };

    fetchTweets();
  }, []);

  return (
    <ul>
      {tweets.map(tweet => (
        <li key={tweet.id}>
          <p>{tweet.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default Feed;
