let Logs = require('../models/log')
let Users = require('../models/user')

module.exports = {
  userLogs: {
    path: '/mylogs',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Logs'
      Logs.find({ creatorId: req.session.uid })
        .then(logs => {
          res.send(handleResponse(action, logs))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  addToShip: {
    path: '/user/:userId/ship',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Assign user to Ship'
      let authorized = false
      Users.findById(req.session.uid)
        .then(user => {
          if (isAuthorized(user)) {
            Users.findById(req.params.userId)
              .then(u => {
                u.shipId = req.body.shipId
                u.save()
                res.send(handleResponse(action, u))
              })
              .catch(err => {
                res.status(400).send(handleResponse(action, null, err))
              })
          } else {
            res.status(401).send(handleResponse(action, null, 'Unauthorized request'))
          }
        })
        .catch(err => {
          res.status(40).send(handleResponse(action, null, err))
        })
    }
  }
}


function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}

function isAuthorized(user) {
  switch (user.rank) {
    case "Captain":
    case "Fleet Captain":
    case "Commodore":
    case "Rear Admiral":
    case "Vice Admiral":
    case "Admiral":
    case "Fleet Admiral":
    case "Commander in Cheif":
      return true
    default:
      return false
  }
}