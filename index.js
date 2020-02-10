// implement your API here
const express = require('express');
const server = express();
const Users = require('./data/db.js');

server.use(express.json());

server.get('/', (req,res) => {
    res.json({hello: 'world!'});
})

server.get('/api/users', (req, res) => {
    Users.find().then( users => {
        res.status(200).json(users);
    }).catch( err => {
        console.log(err);
        res.status(500).json({errorMessafe: `{ errorMessage: "The users information could not be retrieved." }`});
    });
})

const port = 5000;
server.listen(port, () => {
    console.log(`API on port ${port}`);
})