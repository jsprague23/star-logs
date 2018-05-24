var router = require('express').Router()
var Ships = require('../models/ship')
var Users = require('../models/user')
let session = require('../authentication/sessions')

//get by admiral id
router.get('/api/ships', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      } else if (user.rank != 'Admiral') {
        Ships.findById(user.shipId)
          .then((ship) => {
            res.status(200).send(ship)
          })
          .catch(err => {
            res.status(400).send(err)
          })
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
  Users.findById(req.session.uid)
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