var  models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	created: { type: Number, default: Date.now() }
});

module.exports = mongoose.model(models.ship.name, schema);