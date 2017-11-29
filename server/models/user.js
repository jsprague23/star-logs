let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let bcrypt = require('bcryptjs')
const SALT_FACTOR = 10

let schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  rank: {
    type: String, required: true, enum:
      [
        'Civilian',
        'Enlisted',
        'Petty Officer',
        'Ensign',
        'Lieutenant Junior Grade',
        'Lieutenant',
        'Lieutenant Commander',
        'Commander',
        'Captain',
        'Fleet Captain',
        'Commodore',
        'Rear Admiral',
        'Vice Admiral',
        'Admiral',
        'Fleet Admiral',
        'Commander in Chief'
      ],
    default: 'Civilian'
  },
  division: { type: String, enum: ['Command', 'Engineering and Tactical', 'Science and Medical'] },
  shipId: { type: ObjectId, ref: 'Ship' }
})


schema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    } else {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    }
  });
});

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

module.exports = mongoose.model('User', schema)