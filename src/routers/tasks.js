// import express
const express = require('express')

// import mongoose task module
const Task = require('../models/task.js');

// import authentication
const auth = require('../middleware/auth.js')

// create a router
const router = new express.Router()

// create a new task
router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id
	});

	try {
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

// send all tasks
router.get('/tasks', auth, async (req, res) => {
	const match = {}
	const sort = {}

	if (req.query.completed) {
		match.completed = req.query.completed === 'true'
	}

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':')
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
	}
	
	try {
		await req.user.populate({
			path: 'tasks',
			match,
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort
			}
		}).execPopulate()
		res.send(req.user.tasks)
	} catch (error) {
		res.status(500).send()
	}
})

// send a task by id
router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id
	try {
		const task = await Task.findOne({ _id, owner: req.user._id})

		if (!task) {
			return res.status(404).send('No tasks found')
		}

		res.send(task)
	} catch (error) {
		res.status(404).send('No tasks found')
	}
})

// update task data by id
router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidUpdate) {
		return res.status(400).send('Error: invalid updates')
	}

	try {
		const task = await Task.findOne({ _id: req.params.id, owner: req.user.id })

		if (!task) {
			return res.status(404).send('Unable to modify')
		}

		updates.forEach((update) => task[update] = req.body[update])
		await task.save()

		res.send(task)
	} catch (error) {
		res.status(404).send('Unable to modify')
	}
})

// delete a task by id
router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

		if (!task) {
			return res.status(404).send('Unable to delete')
		}

		res.send(task)
	} catch (error) {
		res.status(400).send('Unable to delete')
	}
})

module.exports = router