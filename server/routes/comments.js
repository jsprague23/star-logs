var router = require('express').Router()
var Comments = require('../models/comment')
var Users = require('../models/user')
let session = require('../authentication/sessions')


//GET ALL
router.get('/comments/:logId', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      }
      Comments.find({
        logId: req.params.logId
      })
        .then(comments => {
          res.status(200).send(comments)
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
router.post('/comments', (req, res, next) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      }
      else if (user.shipId != req.body.shipId && user.rank != 'Admiral') {
        return res.status(400).send({ message: "invalid action" })
      }
      var comment = req.body
      Comments.create(comment)
        .then(newComment => {
          res.status(200).send(newComment)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//edit
router.put('/comments/:id', (req, res, next) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: "invalid action" })
      }
      else if (user._id != req.body.userId || user.rank != 'Admiral') {
        return res.status(400).send({ message: "invalid action" })
      }
      Comments.findByIdAndUpdate(req.params.id, req.body, {
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
// router.delete('/comments/:id', (req, res, next) => {
//   Comments.findByIdAndRemove(req.params.id)
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