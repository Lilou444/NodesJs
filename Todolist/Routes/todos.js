##Lilou-444
##06-01-2019

## Routes pour les todos

const db = require('sqlite');
const router = require('express').Router();

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))


// Route GET pour afficher la liste de toutes les todos 
router.get('/', function(req, res) {
  db.all('SELECT * from todos;')
  .then(todos => { 
    res.format({
      'text/html': function(){
        res.render('index.ejs',{
          todos: todos 
        })
      },
      'application/json': function (){
        res.send(todos)
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

// Route POST pour ajouter une todo 
router.post('/', function(req, res, next){
  db.run('INSERT INTO todos(message, completion, updated_at, created_at, userId) VALUES (?, ?, ?, ?, ?);')
  .then(todos => {
  res.format({
    'text/html': function(){
      res.redirect('index.ejs')
    },
    'application/json': function (){
      res.send({message: 'sucess'})
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
})})




// Route get pour ajouter une todo à l'aide d'un formulaire
router.get('/add', function(req, res, next) {
  db.all('SELECT * FROM todos')
  .then(todos => { 
    res.render('addtodos.ejs',{
      todos: todos
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
router.get('/:id/edit', function(req, res,next) {
  db.run("SELECT * FROM todos WHERE ROWID= '"+req.params.id+"';")
  .then(todos => { 
    res.format({
      'text/html': function(){
        res.render('editodos.ejs',{ 
          todos: todos 
        })
      },
      'application/json': function (){
        res.send(todos)
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

//Route DELETE pour supprimer une todo 
router.delete('/:ROWID', (req, res, next) => {
  db.run("DELETE FROM todos WHERE ROWID= ? '" + req.query.id + "';")
  .then(todos => { 
    res.format({
      'text/html': function(){
        res.render('editodos.ejs',{
          todos: todos 
        })
      },
      'application/json': function (){
        res.send({message : 'sucess'})
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

//route GET pour voir une todo en fonction de l'id
router.get(':/ROWID', (req, res, next)=> {
  db.get('SELECT * from todos WHERE ROWID  ' + req.query.id + ';')
  .then(todos => { 
    res.format({
      'text/html': function(){
        res.render('index.ejs',{
          todos: todos
        })
      },
      'application/json': function (){
        res.send(todos)
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
  


module.exports = router

