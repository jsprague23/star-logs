let Users = require('../models/user')
let Logs = require('../models/log')
let Ships = require('../models/ship')


module.exports = {
    getLogsByShipId: {
        path: '/ships/:shipId/logs',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Logs By Ship'
            Users.findById(req.session.uid)
                .then(user => {
                    if (isAuthorized(user)) {
                        Logs.find({ shipId: req.params.shipId })
                            .then(logs=>{
                                res.send(handleResponse(action, logs))
                            })
                            .catch(error => {
                                return next(handleResponse(action, null, error))
                            })
                    } else {
                        res.status(401).send(handleResponse(action, null, "YOU ARE NOT AUTHORIZED TO PERFORM THIS REQUEST"))
                    }
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    
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