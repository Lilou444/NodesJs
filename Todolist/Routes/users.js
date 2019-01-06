##Lilou-444
##06-01-2019

##Routes pour les users


var express = require('express');
var router = express.Router();


const db = require('sqlite');
const router2 = require('express').Router();

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// Route GET pour afficher la liste de toutes les todos 
router2.get('/', function(req, res) {
  db.all('SELECT * from users;')
  .then(users => { 
    res.format({
      'text/html': function(){
        res.render('indexuser.ejs',{
          users: users
        })
      },
      'application/json': function (){
        res.send(users)
      }
    })
  })
  .catch((err) => {
    res.format({
      'text/html': function(){
        res.status(404).send('Not supported yet\n')
      },
      'application/json': function (){
        res.send({message: 'No todos found!'})
      }
    })
  })
})

// Route poste pour ajouter une todo 
router2.post('/', function(req, res, next){
  db.run('INSERT INTO todos VALUES ?;')
  .then(users=> {
  res.format({
    'text/html': function(){
      res.redirect('inscription.ejs',{
        firstname: req.body.message,
       lastname: req.body.completion,
      username: req.body.username,
    email: req.body.email,
   password: req.body.password,
  updated_at: req.body.update,
    created_at: req.body.create,
      })
    },
    'application/json': function (){
      res.status(200).send(users)
    }
  })
})
.catch((err => {
    res.status(404).json('Error has occured');
}))
})

// Route get pour ajouter une todo à l'aide d'un formulaire
router2.get('/add', function(req, res, next) {
  db.all('SELECT * FROM users')
  .then(users => { 
    res.render('inscription.ejs',{
      users: users
    })
  })
  .catch((err) => {
    res.format({
      'text/html': function(){
        res.status(404).send(' Not supported yet\n')
      },
      'application/json': function (){
        res.send({message: 'No todos found!'})
      }
    })
  })
})

// Route GET  pour modifier une todo 
router2.get('/:ROWID/edit', function(req, res,next) {
  db.get("SELECT * from users WHERE ROWID= ' " + req.params.id + "';")
  .then(users => { 
    res.format({
      'text/html': function(){
        res.render('index.ejs',{
         users: users
        })
      },
      'application/json': function (){
        console.log(req.body)
      }
    })
  })
  .catch((err) => {
    res.send(err)
  })
})

//Route pour supprimer une todo 
router2.delete('/:ROWID', (req, res, next) => {
  db.run("DELETE FROM users WHERE ROWID= '" + req.query.id + "';")
  .then(users => { 
    res.format({
      'text/html': function(){
        res.redirect('inscription.ejs')
        },
      'application/json': function (){
        res.send({message : 'sucess'})
      }
    })
  })
  .catch((err) => {
    res.send(err)
  })
})

//route GET pour voir une todo en fonction de l'id
router2.get(':/id', (req, res, next)=> {
  db.get("SELECT * from users WHERE ROWID= ' " + req.query.id + "';")
  .then(users => { 
    res.format({
      'text/html': function(){
        res.render('index.ejs',{
          users: users
        })
      },
      'application/json': function (){
        res.send(users)
      }
    })
  })
  .catch((err) => {
    res.send(err)
  })
})



module.exports = router2


