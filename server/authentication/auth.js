let router = require('express').Router()
let Users = require('../models/user')
let session = require('./sessions')

router.post('/register', (req, res) => {
  Users.create(req.body)
    .then((user) => {
      req.session.uid = user._id
      user.password = null
      delete user.password
      res.send({
        message: 'Successfully created user account',
        data: user
      })
    })
    .catch(err => {
      res.send({ error: err })
    })
})


router.post('/login', (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(user => {
      user.validatePassword(req.body.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).send({ error: 'Invalid Email or Password' })
          }
          req.session.uid = user._id;
          user.password = null
          delete user.password
          res.send({
            message: 'successfully logged in',
            data: user
          })
        })
        .catch(err => {
          res.status(401).send({ error: err || 'Invalid Email or Password' })
        })
    })
    .catch(err => {
      res.status(401).send({
        error: err,
        message: 'Invalid Email or Password'
      })
    })
})

router.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send({
      message: 'You have successfully been logged out. Please come back soon!'

    })

  })
})

router.get('/authenticate', (req, res) => {
  Users.findById(req.session.uid).then(user => {
    if (!user) {
      return res.status(401).send({ "error": "Please Login" })
    }
    return res.send({
      data: user
    })
  }).catch(err => {
    return res.status(500).send({
      error: err
    })
  })
})

router.put('/user/rank-change/:uid?', (req, res) => {
  if(!req.params.uid) {
    Users.findById(req.session.uid)
     .then(user => {
       if(!user) {
         return res.status(401).send({ "error": "Please Login" })
       }
       user.rank = user.changeRank(req.body.rank)
        user.save().then(() => {
            res.send(user)
          })
          .catch(err => {
            res.status(500).send(err)
          })
     })
  }
  Users.findById(req.session.uid).then(currentUser => {
    if (!currentUser) {
      return res.status(401).send({ "error": "Please Login" })
    }
    Users.findById(req.params.uid).then(otherUser => {
      if (!otherUser) {
        return res.status(400).send({
          error: 'invalid user id'
        })
      }

      if (!currentUser.setRoleForOther(otherUser, req.body.rank)) {
        return res.status(401).send({
          error: 'no can do'
        })
      }

      otherUser.save().then(() => {
        res.send({
          message: 'Success roled to ' + otherUser.role
        })
      }).catch(err => {
        res.status(500).send(err)
      })
    })
})
})


module.exports = { router, session }