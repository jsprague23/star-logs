var router = require('express').Router()
var Logs = require('../models/log')
var Users = require('../models/user')
let session = require('../authentication/sessions')
var Ships = require('../models/ship')

//GET ALL
router.get('/logs', (req, res, ) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      } else if (user.rank != 'Admiral') {
        Logs.find({
          shipId: user.shipId
        })
          .then((log) => {
            res.status(200).send(log)
          })
          .catch(err => {
            res.status(400).send(err)
          })
      }
      Logs.find({})
        .then(logs => {
          res.status(200).send(logs)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//ADD
router.post('/logs', (req, res, next) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      }
      else if (user.shipId != req.body.shipId && user.rank != 'Admiral') {
        return res.status(400).send({ message: "invalid action" })
      }
      var log = req.body
      Logs.create(log)
        .then(newLog => {
          res.status(200).send(newLog)
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
router.put('/logs/:id', (req, res, next) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      }
      else if (user._id != req.body.userId || user.rank != 'Admiral') {
        return res.status(400).send({ message: "invalid action" })
      }
      Logs.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
        .then(log => {
          res.status(200).send({
            message: "Successfully Updated",
            log
          })
        })
        .catch(err => {
          res.status(400).send(err)
        })
    })
})

// //DESTROY
// router.delete('/logs/:id', (req, res, next) => {
//   Logs.findByIdAndRemove(req.params.id)
//     .then(data => {
//       res.send("Successfully Removed")
//     })
//     .catch(err => {
//       res.status(400).send(err)
//     })
// })

module.exports = {
  router
}