var express = require('express')
var router = express.Router()
var booksControllers = require('../controllers/books-cont.js')


router.post('/', booksControllers.create)
router.get('/', booksControllers.read)
router.put('/:id', booksControllers.update)
router.delete('/:id', booksControllers.delete)


module.exports = router
