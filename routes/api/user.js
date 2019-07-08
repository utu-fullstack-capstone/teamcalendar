const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body), res.send('Hi from the user!');
});

router.get('/', (req, res) => res.send('Hi get request from the user'));

module.exports = router;
