const express = require('express');

const Users = require('../data/helpers/userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const users = await Users.get();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error loading the users' });
	}
});

module.exports = router;
