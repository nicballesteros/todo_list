//import express from 'express';
//import db from './db/db';

const express = require('express');
const db = require('./db/db');
const bodyParser = require('body-parser');

const server = express();

//Parse incoming requests data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false}))

server.post('/api/v1/todos', (req,res) => {
    if(!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    }
    else if(!req.body.description){
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    else{
        const todo = {
            id: db.todos.length + 1,
            title:req.body.title,
            description: req.body.description
        }
        
        db.todos.push(todo);
        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully',
            todos: todo
        });
    }
});

//delete an element
server.delete('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    let found = false;
    
    for(let i = 0; i < db.todos.length; i++){
        if(db.todos[i].id === id){
            found = true;
            db.todos.splice(i, 1);
            return res.status(200).send({
                success: 'true',
                message: 'todos deleted succssfully',
            });
        }
    }
    
    if(!found){
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
});

//get a single todo element
server.get('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    //console.log(id);
    
    let found = false;
    
    for(let i = 0; i < db.todos.length; i++){
        if(db.todos[i].id === id){
            found = true;
            return res.status(200).send({
                success: 'true',
                message: 'todos retrieved succssfully',
                todo: db.todos[i]
            });
        }
    }
    
    if(!found){
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
});

//get all the todo list elements
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
});