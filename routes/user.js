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

router.get('/:id', async (req, res) => {
	try {
		const user = await Users.getById(req.params.id);

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving the user information' });
	}
});

router.post('/', async (req, res) => {
	if (!req.body.name) {
		res.status(406).json({ message: 'Please enter a name' });
		return;
	}
	try {
		const user = await Users.insert(req.body);
		res.status(201).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error adding user' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const count = await Users.remove(req.params.id);
		if (count > 0) {
			res.status(200).json({ message: 'The user has been deleted' });
		} else {
			res.status(404).json({ message: 'The user could not be found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error deleting the user' });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const user = await Users.update(req.params.id, req.body);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: 'The user could not be found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error updating the user information' });
	}
});

module.exports = router;
