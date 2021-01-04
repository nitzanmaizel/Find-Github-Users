const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../models/User');
const { auth, isAdmin } = require('../middleware/auth');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server error');
	}
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

		const { password, email } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credential' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credential' });
			}

			const payload = {
				id: user._id,
				isAdmin: user.isAdmin,
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) console.error(err.message);
				res.json({ token });
			});
		} catch (err) {
			console.error(err.massage);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
