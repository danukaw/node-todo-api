const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const{ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const PORT = process.env.PORT || 3000

let app = express();
let router = express.Router();

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

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)) {
        res.status(404).send({});
    }

    Todo.findById(req.params.id).then((todo)=> {
        if(todo) {
            res.send({todo});
        } else {
            res.status(404).send();
        }
        
    }).catch((e)=> {
        res.status(400).send();
    });
});

app.get('/todos', (req, res) => {
    Todo.find()
        .exec()
        .then((todos)=> {
            res.send({todos});
        }, (err) => {
            res.status(400).send(err);
        }); 
});

app.delete('/todos/:id', (req, res) => {

    let id = req.params.id;
    console.log(id);

    if(!ObjectID.isValid(id)) {
        res.status(404).send({});
    }
    
    Todo.findByIdAndRemove(id).then((todo)=> {
        if(todo) {
            res.send(todo);
        } else {
            res.status(404).send({});
        }

    }).catch((e)=> {
        res.status(400).send(e);
    });
});

app.patch('/todos/:id', (req, res) => {
    
    let id = req.params.id;
    let updatedTodo = _.pick(req.body, ['text','completed']);

    console.log(id);

    updatedTodo.text = req.body.text;

    console.log(updatedTodo);
    
    if(!ObjectID.isValid(id)) {
        res.status(404).send({});
    }

    if(_.isBoolean(updatedTodo.completed) && updatedTodo.completed) {
        updatedTodo.createdAt= new Date().getTime();
    } else {
        updatedTodo.createdAt = null;
        updatedTodo.completed = false;
    }

    Todo.findByIdAndUpdate(id, {$set : updatedTodo}, {new : true}).then((todo)=> {
        res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    });

 /*    Todo.findByIdAndUpdate(id, {text : req.body.text},{ new: true }).then((todo) => {
        res.send(todo);
    }).catch((e)=> {
        res.status(400).send(e);
    });
 */
/*     Todo.update({ _id: id }, { $set: { text: req.body.text }}, (err, todo)=> {
    if(err) res.status(404).send({});
        res.send(todo);
    }); */
});

app.listen(PORT, (err)=> {
    //if(err) return new Error(err);
    console.log(`server has started and bind to ${PORT}`);
});

module.exports = {app};