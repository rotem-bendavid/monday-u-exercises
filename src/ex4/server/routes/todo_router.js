const express = require('express');

const {
    createTodo,
    getAll,
    deleteTodo,
} = require('./api.js');
const todoRouter = express.Router();

todoRouter.get('/get', getAll);
todoRouter.post('/', createTodo);
todoRouter.delete('/', deleteTodo);

module.exports = todoRouter;