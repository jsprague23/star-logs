let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let bcrypt = require('bcryptjs')
var schemaName='User'
const SALT_FACTOR = 10

const USERROLES = [
  "Ensign",
  "Lieutenant",
  "Captain"
]

const ADMINROLES = [
  "Admiral"
]

const ROLES = [...USERROLES, ...ADMINROLES]

let schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  rank: {
    type: String, required: true, enum:
      [
        'Ensign',
        'Lieutenant',
        'Captain',
        'Admiral',
      ],
    default: 'Ensign'
  },
  shipId: { type: ObjectId, ref: 'Ship', required:true }
})


// schema.pre('save', function (next) {
//   var user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
//     if (err) {
//       return next(err);
//     } else {
//       bcrypt.hash(user.password, salt, function (err, hash) {
//         user.password = hash;
//         next();
//       });
//     }
//   });
// });

schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  })
};

schema.methods.changeRank = function (reqRole) {
  var currentRole = this.role
  if (ROLES.indexOf(reqRole) > ROLES.indexOf(currentRole)) {
    return currentRole
  }
  return reqRole
}

schema.methods.setRoleForOther = function (other, rank) {
  
  var isAdmiral = ADMINROLES.includes(this.role)
  var canChangeRole = isAdmiral && ROLES.indexOf(this.role) > ROLES.indexOf(other.role)
  if (canChangeRole) {
    other.role = this.changeRole(rank)
    return true
  }
}

module.exports = mongoose.model('User', schema)