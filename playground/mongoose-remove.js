const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/* Todo.remove({}).then((todos)=> {
    console.log(todos.result);
})

Todo.findOneAndRemove({_id : ''}).then((todo)=> {
    console.log(todo);
}); */
let id = '1212423';
Todo.findByIdAndRemove("5a81d0f3206d24ac401c4592").then((todo)=>{
    console.log(todo);
}).catch((e)=> {
    console.log(e);
});