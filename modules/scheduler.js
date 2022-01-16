const scheduler = require('node-schedule');
const send = require('./notifier');
const Reminder = require('../models/reminders');
const Todos = require('../models/todos');
const log = require('log-to-file');

// function schedule
/**
 * Schedules the job for the given reminder
 * @param {string} id Reminder id
 * @param {object} user user itself
 * @param {Date} time time on which reminder to be sent
 */
function scheduleJob(id, user, time) {
    const job = scheduler.scheduleJob(time, async () => {
        try {
            // check if there exists any reminder with the given id
            const reminder = await Reminder.findById(id);
            if (reminder) {
                // compose and send the mail
                send(reminder);
            }
            // upon success delete the reminder from the database
            await Reminder.findByIdAndDelete(id);

            // also delete from user's todo list
            const existingTodo = await Todos.findOne({ user_id: user });
            const index = existingTodo.todos.indexOf(id);
            if (index > -1) {
                await existingTodo.todos.splice(index, 1);
                existingTodo.save();
            }
        } catch (err) {
            // log in case any error
            log('scheduler module ' + err, 'errorFile.log');
        }
    });
}

module.exports = scheduleJob;
