/**
 * this file handles routing of the reminders
 * file contents : get , add, delete, getAll
 */

const express = require('express');
const Todos = require('../models/todos');
const Reminder = require('../models/reminders');
const isLoggedIn = require('../middlewares/loggedIn');
const scheduleJob = require('../modules/scheduler');
const router = express.Router();
const log = require('log-to-file');

/**
 * sends all the todos of the user
 * middleware checks if the user is logged in else error will be thrown
 */
router.get('/getAll', isLoggedIn, async (req, res) => {
    try {
        const user = await Todos.findOne({ user_id: req.user._id });
        const all = user.todos;
        res.send(all);
    } catch (err) {
        log('reminder js (getAll Route) ' + err, 'errorFile.log');
    }
});

/**
 * get task of a specific id
 */
router.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reminder = await Reminder.findById(id);
        if (reminder) {
            res.send(reminder);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        log('reminder js (get/id Route) ' + err, 'errorFile.log');
    }
});

/**
 * add todo
 */
router.post('/add', async (req, res) => {
    const { todo, time } = req.body;
    try {
        const reminder = await Reminder.create({
            content: todo,
            time: time,
            email: req.user.email
        });

        // schedule the email
        scheduleJob(reminder._id, req.user._id, time);
        let existingTodo = await Todos.findOne({ user_id: req.user._id });
        // check if there is any todo added first

        if (existingTodo) {
            await existingTodo.todos.push(reminder._id);
            existingTodo.save();
        } else {
            // (in case new user with no db data)
            let newUserTodo = new Todos({
                user_id: req.user._id,
                todos: [reminder._id],
                completed: []
            });

            await newUserTodo.save();
        }

        res.send(reminder._id);
    } catch (err) {
        log('reminder js (add Route) ' + err, 'errorFile.log');
    }
});

// delete a specific reminder
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Reminder.findByIdAndDelete(id);
        const existingTodo = await Todos.findOne({ user_id: req.user._id });
        const index = existingTodo.todos.indexOf(id);
        if (index > -1) {
            await existingTodo.todos.splice(index, 1);
            existingTodo.save();
        }
        res.send(id);
    } catch (err) {
        log('reminder js (delete Route) ' + err, 'errorFile.log');
    }
});

module.exports = router;
