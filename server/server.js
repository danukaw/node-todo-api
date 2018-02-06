const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const PORT = process.env.PORT || 3000

var app = express();

//first add some middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] === 'https') {
        
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.post('/todos', (req, res) => {
    
    let newTodo = new Todo({
        text : req.body.text
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });

});

app.get('/todos', (req, res) => {
    Todo.find()
        .exec()
        .then((doc)=> {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        }); 
});

app.post('/todo', (req, res) => {
    Todo.find()
        .where({_id : req.body._id})
        .exec()
        .then((doc)=> {
            res.send(doc);
        }, (err) => {
            res.status(400).send(e);
        }); 
});

app.listen(PORT, (err)=> {
    //if(err) return new Error(err);
    console.log(`server has started and bind to ${PORT}`);
});