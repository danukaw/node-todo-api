const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5a7e55416c549b2c3a625956'

if(!ObjectID.isValid(id)){
    console.log(`The ObjectID is not valid`);
} else {
    console.log(`This is a valid ObjectID`);
}

Todo.find().then((todos) =>{
    console.log(todos);
});

Todo.findOne({
    _id : id
}).then((todo) => {
    console.log(todo);
});

Todo.findById(id).then((todo) => {
    return console.log(todo);
}).catch((e)=> {
    return console.log(e);
});