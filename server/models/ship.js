var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Ship'
var log=require('./log')
var ObjectId = Schema.Types.ObjectId

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  logs:[log.schema],
  author: {type: String, required: true},
  userId:{
    type: ObjectId,
    ref: "User",
    required:true
  }
})

module.exports = mongoose.model(schemaName, schema)