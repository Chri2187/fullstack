const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Inserire un nome'],
    minlength: 4,
    maxlength: 25,
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'Inserire un Cognome'],
    minlength: 4,
    maxlength: 25,
    select: false,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Inserire una mail valida',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Inserire una password'],
    minlength: 6,
    select: false,
  },
  birthDay: {
    type: String,
    required: true,
    trim: true,
  },
});

// prima di salvare faccio hash
UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.compare(this.password,salt)
});

// crea JWT per utente registrato
UserSchema.methods.createJWT = () => {
  return jwt.sign({ userId: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// Confronto la pwd
UserSchema.methods.comparePassword = async function(candidate) {
  const isMatch = await bcryptjs.compare(candidate,this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema);
