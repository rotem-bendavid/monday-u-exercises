const todoService = require("../services/item_manager.js");

async function createTodo(req, res) {
    await todoService.addTodo(req.body.todoValue);
    res.status(200).json(req.body.todoValue);
}

async function getAll(req, res) {
    let data = await todoService.getAll();
    if (!data) data = [];
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