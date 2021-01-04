const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../models/User');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

router.get('/', (req, res) => {
	res.send('Get logged in user');
});

// @route    POST api/auth
// @desc     Auth user & get token
// @access   Public

router.post(
	'/',
	[
		check('email', 'Please enter valid email').isEmail(),
		check('password', 'Password must be greater than 6 character').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send('Log in user');
	}
);

module.exports = router;
