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
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    });
});

server.post('/api/users', (req,res) => {
    const usersInfo = req.body;
    Users.insert(usersInfo).then(user => {
        res.status(200).json(user);
    }).catch( err => {
        console.log(err);
        res.status(500).json({errorMessage:"There was an error while saving the user to the database"});
    });
});

server.get('/api/users/:id', (req, res) =>{
    Users.findById(req.params.id).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage:"There was an error while saving the user to the database"});
    })
})

server.delete('/api/users/:id', (req, res) =>{
    Users.remove(req.params.id).then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage:"There was an error while saving the user to the database"});
    })
})


server.put('/api/users/:id', (req, res) => {

    const updateUser = req.body;

    Users.update(req.params.id, updateUser).then( user => {
        if (user){
            res.status(200).json(user);
        } else {
            res.status(400).json({errorMassage: "There was an error"})
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'The user information could not be modified.' })
    })
})

const port = 5000;
server.listen(port, () => {
    console.log(`API on port ${port}`);
})


// router.put("/", Auth, (req, res) => {
//     const changes = req.body;
//     const id = req.user.id;
  
//     Parent.edit(id, changes)
//       .then(info => {
//         if (info) {
//           res.status(200).json({ info: changes });
//         } else {
//           res.status(404).json({ message: "Error getting user info" });
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ message: "Error updating user info" });
//       });
//   });