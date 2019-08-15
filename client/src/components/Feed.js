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
    const fetchHashtags = async () => {
      const hashtagsapi = await axios.get(`/api/hashtag`);
      const list = hashtagsapi.data;
      const tagarray = list.map(tag => tag.name);
      fetchTweets(tagarray);
    };
    const fetchTweets = async tagarray => {
      let query = tagarray.join('+');
      const twitterApi = await axios.get(`/api/twitter/?q=${query}`);
      setTweets(twitterApi.data.statuses);
      setLoading(false);
    };
    fetchHashtags();
  }, []);

  return (
    <Fragment>
      {isLoading && <Spinner animation='border' variant='primary' />}
      <CardColumns>
        {tweets.map(tweet => (
          <Card key={tweet.id} className='bg-primary text-dark mb-4'>
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
