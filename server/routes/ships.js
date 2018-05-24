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
router.put('/api/galaxies/:id', (req, res, next) => {
  Galaxies.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(galaxy => {
      res.status(200).send({ message: "Successfully Updated", galaxy })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/galaxies/:id', (req, res, next) => {
  Galaxies.findByIdAndRemove(req.params.id)
    .then(data => {
      res.send("Successfully Deleted Cat")
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}