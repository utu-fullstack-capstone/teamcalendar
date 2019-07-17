const Twitter = require('twitter');
const config = require('config');
const express = require('express');
const router = express.Router();

// Twitter proxy

const consumer_key = config.get('twitter_consumer_key');
const consumer_secret = config.get('twitter_consumer_secret');
const access_token_key = config.get('twitter_access_token_key');
const access_token_secret = config.get('twitter_access_token_secret');

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
});

router.get('/', (req, res) =>
  client.get('search/tweets', { q: req.query.q }, function(error, tweets) {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    res.json(tweets);
  })
);

module.exports = router;
