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

    /* db.collection('Users').find({
        _id: new ObjectID("5a730bac4dc3a0012c442821")
    }).toArray().then((result)=> {
        console.log(JSON.stringify(result, undefined, 2));
    },(err)=>{
        console.log('Unable to fetch todos', err);
    }); */

    db.collection('Users').find({name : "Danuka Wijetunge"}).count().then((result)=> {
        console.log(JSON.stringify(result, undefined, 2));
    },(err)=> {
        console.log('Unable to fetch todos', err);
    });


    db.close();
});

