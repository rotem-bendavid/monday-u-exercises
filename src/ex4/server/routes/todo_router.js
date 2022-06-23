const express = require('express');

const {
    createTodo,
    getAll,
    deleteTodo,
    changeStatus,
} = require('./api.js');
const todoRouter = express.Router();

todoRouter.get('/get', getAll);
todoRouter.post('/', createTodo);
todoRouter.delete('/', deleteTodo);
todoRouter.put('/', changeStatus);

module.exports = todoRouter;