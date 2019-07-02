const express = require('express');
const router = express.Router();

// POST api/events
// Test route for posting events to mongo

router.post('/', (req, res) => {
  res.json(req.body);
  console.log(req.body);
});

module.exports = router;
