const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {
        text : 'first todo'
    },
    {
        text : 'second todo'
    }
]

beforeEach((done)=>{
    Todo.remove({}).then( () => {
        Todo.insertMany(todos)
    }).then(()=> {
        return done();
    });
});

describe('Post /todos', () => {
    it('it should create a todo', (done)=>{
        let text = 'testing started';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=> {
                expect(res.body.text).toBe(text);
            }).end((err, res) => {
                
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    
                    expect(todos.length).toBe(3);
                    //expect(todos[0].text).toBe(text);
                    
                    return done();

                }).catch((err) => {
                    return done(err);
                })

                
                
            });
    });

    it('It should not create todo with invalid data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {

                if(err) return done(err);

                Todo.find().then((todos)=> {
                    expect(todos.length).toBe(2);
                    return done();
                });
            });
    });
});

describe('GET /todos', () => {
    it('should retrived all todos saved', (done) => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos[0].text).toBe(todos[0].text);
                expect(res.body.todos[1].text).toBe(todos[1].text);
            })
            .end((err, res) => {
                
                if(err) return done(err);

                return done();
            });
    });
});

