const express = require('express');
const router = express.Router();

// get api/test
// Test

router.get('/', (req, res) => {
	const jsonresponse = {message: 'Hello from node backend!'};
	res.json(jsonresponse);
});

module.exports = router;
