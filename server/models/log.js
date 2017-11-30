var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  shipId: { type: ObjectId, ref: models.ship.name },
  created: { type: Number, default: Date.now() },
  creatorId: { type: ObjectId, ref: models.user.name, required: true },

  // Should Probably belong to a ship
});

module.exports = mongoose.model(models.log.name, schema);