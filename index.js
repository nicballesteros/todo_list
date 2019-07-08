//import express from 'express';
//import db from './db/db';

const express = require('express');
const db = require('./db/db');

const server = express();

server.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved succssfully',
        todos: db.todos
    });
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log('Express server is running on port 5000');
})