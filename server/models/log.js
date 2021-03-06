var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Log'
var ObjectId = Schema.Types.ObjectId

var schema = new Schema({
  title: {
    type: String,
    required: true
  },
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
  }
})

module.exports = mongoose.model(schemaName, schema)