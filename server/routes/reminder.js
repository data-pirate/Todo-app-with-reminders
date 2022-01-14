const express = require('express');
const Todos = require('../models/todos');
const Reminder = require('../models/reminders');
const router = express.Router();

router.get('/getAll', async (req, res)=>{
    try{
        const user = await Todos.findOne({user_id: req.user._id})
        const all = user.todos;
        res.send(all);
    }catch(err){
        console.log(err);
    }
})

router.get('/get/::id', async (req, res)=>{
    const { id } = req.params;
    try{
        const reminder = await Todos.findById(id);
        res.send(reminder);
    }catch(err){
        console.log(err);
    }
    res.send(undefined);
});

router.post('/add', async (req, res)=>{
    const { todo, time} = req.body;
    try{
        const reminder = await Reminder.create({content: todo, time: time});
        const existingTodo = await Todos.findOne({user_id: req.user._id})
        console.log(existingTodo)
        let list = [];
        if(existingTodo){
            await existingTodo.todos.push(reminder._id);
            existingTodo.save()
            list = existingTodo.todos;
        }else{
            const newUserTodo = new Todos({
                user_id: req.user._id,
                todos: [reminder._id],
                completed: []
            })

            await newUserTodo.save();
            list = newUserTodo.todos;
        }

        res.send(list);
    }catch(err){
        console.log(err);
    }
})


router.post('/delete', async (req, res)=>{
    const { reminder_id} = req.body;
    try{
        await Reminder.findByIdAndDelete(reminder_id);
        const existingTodo = await Todos.findOne({user_id: req.user._id});

        let list = [];
        const index = existingTodo.todos.indexOf(5);
        if (index > -1) {
            await existingTodo.todos.splice(index, 1);
            existingTodo.save();
        }
        list = existingTodo.todos;
        res.send(list);
    }catch(err){
        console.log(err);
    }
})

module.exports = router
