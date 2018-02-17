const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = "5a82be393d5cce702b0961a0"

Todo.findByIdAndUpdate(id, {text : "Updated via findByIdAndUpdate with new : true"}, { new: true }).then((todo)=> {
    console.log(todo)
});

/* Todo.update({ _id: id }, { $set: { text: 'via update with call back' }}, (err, todo)=> {
    if(err) return console.log(err);
    console.log(todo);
}); */

/* Todo.update({ _id: id }, { $set: { text: 'via update' }}).then((todo)=>{
    console.log(JSON.stringify(todo, undefined, 2));
}).catch((err)=>{
    console.log(`error in updating todo ${err}`)
}) */