const express = require('express');
const router = express.Router();

// @route    POST api/users
// @desc     Signup user
// @access   Public

router.post('/', (req, res) => {
	res.send('Signup user');
});

module.exports = router;
