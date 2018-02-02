const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=> {
    if(err) {
        return 'Unable to connect to mongodb server';
    }
    console.log('Connection has been established to server')
    
    /* db.collection('Todos').insert({
        text : 'some thing has to add',
        completed : false

    }, (err, result) => {
        if(err) {
            return `Unable to store data into database`;
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    }); */

    db.collection('Users').insertOne({
        name : 'Danuka Wijetunge',
        age : 34,
        location : 'Battaramulla'
    }, (err, result) => {
        if(err) {
            return `Unable to store data into database`;
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.close();
});

