const {MongoClient, ObjectID} = require('mongodb');

//E6 feature object destructuring..

let person = {name : "danuka wijetunge", age : 15, location : 'Battaramulla'};

let {name} = person;

console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=> {
    
    if(err) {
        return 'Unable to connect to mongodb server';
    }
    console.log('Connection has been established to server');

    //deleteMany
/*     db.collection('Todos').deleteMany({text : "eat lunch"}).then((result) => {
        console.log(result);
    }); */
    //findOneAndDelete
    db.collection('Users').findOneAndDelete({_id : new ObjectID("5a7310f6415db030a4a1679c")}).then((result) => {
        console.log(result);
    });

    db.close();
});

