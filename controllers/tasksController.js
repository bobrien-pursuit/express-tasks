const express = require('express')
const tasks = express.Router()
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../queries/tasks')
const { checkTitle } = require('../validations/tasks')

// GET ALL tasks
// localhost:4001/tasks/
tasks.get('/', async (req, res) => {
    try {
        const tasks = await getTasks()
        res.status(200).json(tasks)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

// GET ONE task
// localhost:4001/tasks/3
tasks.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getTask(id)
        if(task.task_id){
            res.status(200).json(task)
        } else {
            res.status(404).json({ error: "Task Not Found" })
        }
    } catch (err) {
        res.status(404).json({ error: err })
    }
})


// CREATE a task
// localhost:4001/tasks/
tasks.post('/', checkTitle, async (req, res) => {
    try {
        const newTask = await createTask(req.body)
        res.status(201).json(newTask)   
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})


// UPDATE a task
// localhost:4001/tasks/3
tasks.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedTask = await updateTask(id, req.body)
        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})


// Delete a task
// localhost:4001/tasks/3
tasks.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedTask = await deleteTask(id)
        res.status(200).json({ message: "Task was successfully removed"})
    } catch (err) {
        res.status(404).json({ error: err })
    }
})


module.exports = tasks