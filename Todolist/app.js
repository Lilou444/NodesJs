##Lilou-444
##06-01-2019

## Projet Todolist Node Js


const db = require('sqlite')
const express = require('express')
var app = express()
const bodyParser = require('body-parser')
var engine = require( 'ejs' );

app.set('views','./views')
app.set('view engine', 'ejs')

db.open('todolist.db').then(() => {
    Promise.all([
      db.run("CREATE TABLE IF NOT EXISTS todos ( message, completion, updated_at,created_at, userId)"),
      db.run("CREATE TABLE IF NOT EXISTS users (firstname, lastname, username, password, email, created_at, updated_at)")
    ]).then(() => {
      console.log('Database is ready')
    }).catch((err) => {
      console.log('Une erreur est survenue :', err)
    })
  })



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/todos',require('./routes/todos.js'))
app.use('/users',require('./routes/users.js'))

app.use(express.static(__dirname + 'public'))

  
app.listen(8080);



