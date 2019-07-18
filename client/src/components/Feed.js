import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

function Feed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    let query = 'Salibandy';
    const fetchTweets = async () => {
      const twitterApi = await axios(`/api/twitter/?q=${query}`);
      setTweets(twitterApi.data.statuses);
    };

    fetchTweets();
  }, []);

  return (
    <CardColumns>
      {tweets.map(tweet => (
        <Card key={tweet.id} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>
              <i class='fab fa-twitter' /> {tweet.user.name}
            </Card.Title>
            <Card.Text>{tweet.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  );
}

export default Feed;
