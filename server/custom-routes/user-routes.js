let Logs = require('../models/log')

module.exports = {
  userBoards: {
    path: '/mylogs',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Logs'
      Logs.find({creatorId: req.session.uid})
        .then(logs => {
          res.send(handleResponse(action, logs))
        }).catch(error => {
          return next(handleResponse(action, null, error))
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