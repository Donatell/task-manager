// import express
const express = require('express');

const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account.js');

// import and setup multer for avatars
const multer = require('multer');
const upload = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload a png, jpg or jpeg image'));
		}
		cb(undefined, true);
	}
});

//import sharp for editing uploaded avatars
const sharp = require('sharp');

// import mongoose user module
const User = require('../models/user.js');

// import middleware
const auth = require('../middleware/auth.js');

// create a router
const router = new express.Router();

// create a user
router.post('/users', async (req, res) => {
	let user = new User(req.body);

	try {
		await user.save();
		// sendWelcomeEmail(user.email, user.name);
		const token = await user.generateAuthToken();
		res.status(201).json({ user, token, msg: 'Account Created' });
	} catch (error) {
		switch (error.code) {
			case 11000:
				res.status(202).json({ msg: 'E-Mail already taken' });
				break;
			default:
				console.log('Uncaught Error Code: ', error.code);
				console.log('Error Object:', error);
				break;
		}

	}
});

// send personal profile of user by authentication
router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

// update user, requires authentication
router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidUpdate = updates.every(
		(update) => allowedUpdates.includes(update));

	if (!isValidUpdate) {
		return res.status(400).send();
	}

	try {
		updates.forEach((update) => req.user[update] = req.body[update]);
		await req.user.save();

		res.send(req.user);
	} catch (error) {
		res.status(404).send();
	}
});

// delete user, requires authentication
router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		sendCancelEmail(req.user.email, req.user.name);
		res.send(req.user);
	} catch (error) {
		res.status(400).send('Error: invalid id');
	}
});

// login
router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email,
			req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(400).send('Unable to login');
	}
});

// logout
router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens =
			req.user.tokens.filter((token) => token.token !== req.token);
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

// logout of all sessions
router.post('/users/logoutall', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send('Logged out of all sessions');
	} catch (error) {
		res.status(500).send();
	}
});

// upload avatar with callback to manually handle multer errors: message to JSON
router.post('/users/me/avatar', auth, upload.single('avatar'),
	async (req, res) => {
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 }).png().toBuffer();

		req.user.avatar = buffer;
		await req.user.save('Avatar has been uploaded');
		res.send();
	}, (error, req, res, next) => {
		res.status(400).send({ error: error.message });
	});

// delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send('Avatar has been deleted');
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message });
});

// get avatar by user id
router.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.avatar) {
			throw new Error('Avatar or user doesn\'t exist');
		}

		res.set('Content-Type', 'image/jpg');
		res.send(user.avatar);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;