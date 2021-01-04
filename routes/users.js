const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const { findOne } = require('../models/User');

// @route    POST api/users
// @desc     Signup user
// @access   Public

router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please enter valid email').isEmail(),
		check('password', 'Password must be greater than 6 character').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'User already exist' });
			}
			user = new User({ name, email, password });
		} catch (err) {
			console.error(err.massage);
			res.status(500).json({ msg: 'Server error' });
		}
	}
);

module.exports = router;
