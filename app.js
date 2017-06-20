const express = require('express')
const bodyParser = require('body-parser')
const books = require('./routes/books.js')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/books', books)


app.listen(3000, ()=>{
  console.log('connect to port 3000');
})
