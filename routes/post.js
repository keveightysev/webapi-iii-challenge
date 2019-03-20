const express = require('express');

const Posts = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const posts = await Posts.get();
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error downloading posts' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const post = await Posts.getById(req.params.id);
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'Post not found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error finding the post' });
	}
});

router.post('/', async (req, res) => {
	if (!req.body.text || !req.body.user_id) {
		res.status(406).json({ message: 'Please enter text and user ID' });
		return;
	}
	try {
		const post = await Posts.insert(req.body);
		res.status(200).json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error adding the post' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const count = await Posts.remove(req.params.id);
		if (count > 0) {
			res.status(200).json({ message: 'The post has been deleted' });
		} else {
			res.status(404).json({ message: 'Post not found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error deleting the post' });
	}
});

router.put('/:id', async (req, res) => {
	if (!req.body.text || !req.body.user_id) {
		res.status(406).json({ message: 'Please enter text and user ID' });
		return;
	}
	try {
		const post = await Posts.update(req.params.id, req.body);
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'Post not found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error updating the post' });
	}
});

module.exports = router;
