var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var url = 'mongodb://localhost/library';
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  create: (req, res)=>{
    var insertDocument = function(db, callback){
      db.collection('Books').insertOne(
        {
          "isbn": req.body.isbn,
          "title": req.body.title,
          "author": req.body.author,
          "category": req.body.category,
          "stock": req.body.stock
        }, function(err, result){
        assert.equal(err, null);
        res.json(result)
        callback()
      })
    }
    MongoClient.connect(url, function(err, db){
      assert.equal(null, err)
      insertDocument(db, function(){
        db.close()
      })
    })
  },
  read: (req, res)=>{
    var findBooks = function(db, callback){
      var cursor = db.collection('Books').find().toArray(function(err, book){
        assert.equal(err, null);
        if(book != null ) {
          res.send(book)
        } else {
          callback()
        }
      })
    }
    MongoClient.connect(url, function(err, db){
      assert.equal(null, err)
      findBooks(db, function(){
        db.close()
      })
    })
  },
  update: (req, res)=>{
    var updateBooks = function(db, callback){
      db.collection('Books').replaceOne({
        "_id": ObjectId(req.params.id)
      }, {
          "isbn": req.body.isbn,
          "title": req.body.title,
          "author": req.body.author,
          "category": req.body.category,
          "stock": req.body.stock
        }, function(err, result){
            res.json({message: `update`});
            callback()
          })
    }
    MongoClient.connect(url, function(err, db){
      assert.equal(null, err)
      updateBooks(db, function(){
        db.close()
      })
    })
  },
  delete : (req, res)=>{
    var deleteBooks = function(db, callback){
      db.collection('Books').deleteOne({
        "_id": ObjectId(req.params.id)
      }, function(err, result){
          if (err) {
            res.send(err)
          } else {
            res.json(result);
            callback()
          }
      })
    }
    MongoClient.connect(url, function(err, db){
      assert.equal(null, err)
      deleteBooks(db, function(){
        db.close()
      })
    })
  }
}
