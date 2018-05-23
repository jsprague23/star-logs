var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Ship'
var log=require('./log')

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  logs:[log.schema]
})

module.exports = mongoose.model(schemaName, schema)