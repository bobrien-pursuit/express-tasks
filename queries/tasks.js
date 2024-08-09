const db = require('../db/dbConfig')


const getTasks = async (userId) => {
    try {
        const tasks = await db.any("SELECT * FROM tasks WHERE user_id=$1", userId)
        return tasks
    } catch (error) {
        return error
    }
}


const getTask = async (id, userId) => {
    try {
        const task = await db.one("SELECT * FROM tasks WHERE task_id=$1 AND user_id=$2", [id, userId])
        return task
    } catch (error) {
        return error
    }
}


const createTask = async (task) => {
    try {
        const completed = task.completed || false
        const newTask = await db.one("INSERT INTO tasks (title, description, completed, created_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [task.title, task.description, completed, new Date(), task.user_id]);

        return newTask;
    } catch (err) {
        return err
    }
}


// UPDATE a task
const updateTask = async (id, task) => {
    try {
        const { title, description, completed, created_at, user_id } = task 
        const updatedTask = await db.one("UPDATE tasks SET title=$1, description=$2, completed=$3, created_at=$4, user_id=$5 WHERE task_id=$6 RETURNING *", [title, description, completed, created_at, user_id, id])
        return updatedTask
    } catch (err) {
        return err
    }
}


// DELETE a task
const deleteTask = async (id) => {
    try {
        const deletedTask = await db.one("DELETE FROM tasks WHERE task_id=$1 RETURNING *", id)
        return deletedTask
    } catch (error) {
        return error
    }
}


module.exports = { getTasks, getTask, createTask, updateTask, deleteTask }