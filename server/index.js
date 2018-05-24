var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
//Fire up database connection
require('./db/mlab-config')


//REGISTER MIDDLEWEAR
app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

let auth = require('./authentication/auth')
app.use(auth.session)
app.use(auth.router)
//Code above is always the same ^^

//routes
var ships = require('./routes/ships')
var logs = require('./routes/logs')
var comments = require('./routes/comments')

app.use(ships.router)
app.use(logs.router)
app.use(comments.router)

app.use('/members/*', (req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

// app.use('/admin/*', (req, res, next) => {

//     Admirals.findOne({
//         uid: req.session.uid
//       })
//       .then(isAdmin => {
//         if (!isAdmin) {
//           return res.status(401).send({
//             error: 'Insufficient Privledges'
//           })
//         }
//         next()
//       })
//     if (!req.session.uid) {
//       return res.status(401).send({
//         error: 'please login to continue'
//       })
//     }
//     next()
     
// })




//Catch all

app.get('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})


app.listen(port, () => {
  console.log('server running on port', port)
})