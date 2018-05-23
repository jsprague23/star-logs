var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Comment'
var ObjectId = Schema.Types.ObjectId

var schema = new Schema({
   body:{
    type: String,
    required: true
  },
  shipId:{
    type:ObjectId,
    ref:'Ship',
    required:true
  },
  userId:{
    type:ObjectId,
    ref: "User",
    required:true
  },
  logId:{
    type:ObjectId,
    ref:'Log',
    required:true
  }
})

module.exports = mongoose.model(schemaName, schema)