const { json } = require("stream/consumers");
const todoService = require("../services/item_manager.js");

async function createTodo(req, res) {
    const data = await todoService.addTodo(req.body.todoValue);
    res.status(200).json(data);
}

async function getAll(req, res) {
    let data = await todoService.getAll() || [];
    res.status(200).json(data);
}

async function deleteTodo(req, res) { 
    const data = await todoService.deleteTodo(req.body.todoValue);
    res.status(200).json(data);
}

async function changeStatus(req, res) { 
    const data = await todoService.changeStatus(req.body.todoValue);
    res.status(200).json(data);
}

module.exports = {
    createTodo,
    getAll,
    deleteTodo,
    changeStatus,
};