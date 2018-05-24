var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Ship'
var ObjectId = Schema.Types.ObjectId

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {type: String, required: true},
  userId:{
    type: ObjectId,
    ref: "User",
    required:true
  }
})

module.exports = mongoose.model(schemaName, schema)