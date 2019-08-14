import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fi';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

function Feed() {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let query = 'Salibandy';
    const fetchTweets = async () => {
      const twitterApi = await axios(`/api/twitter/?q=${query}`);
      setTweets(twitterApi.data.statuses);
      setLoading(false);
    };

    fetchTweets();
  }, []);

  return (
    <Fragment>
      {isLoading && <Spinner animation='border' variant='primary' />}
      <CardColumns>
        {tweets.map(tweet => (
          <Card key={tweet.id} className='bg-primary text-dark'>
            <Card.Body>
              <Row>
                <Col xs={1}>
                  <i className='fab fa-twitter' />
                </Col>
                <Col>{tweet.text}</Col>
              </Row>
              <Row>
                <Col className='text-right posted'>
                  {moment(tweet.created_at).fromNow()}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </Fragment>
  );
}

export default Feed;
