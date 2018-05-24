var router = require('express').Router()
var Ships = require('../models/ship')
var Users = require('../models/user')

//get by admiral id
router.post('/api/ships', (req, res, next) => {
  var userId = req.body
  Users.findOne({
    _id: req.body._id
  })
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      } else if (user.rank != 'Admiral') {
        return res.status(400).send({ message: "invalid action" })
      }
      Ships.find({})
        .then(ships => {
          res.status(200).send(ships)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.post('/api/create-ship', (req, res, next) => {
  Users.findOne({
    _id: req.body.userId
  })
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      } else if (user.rank != 'Admiral') {
        return res.status(400).send({ message: "invalid action" })
      }
      Ships.create(req.body)
        .then(newShip => {
          res.status(200).send(newShip)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}