const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Inserire un nome"],
    minlength: 4,
    maxlength: 25,
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Inserire un Cognome"],
    minlength: 4,
    maxlength: 25,
    select: false,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Inserire una mail valida",
    },
    unique: true,
  },
  birthDay: {
    type: String,
    required: true,
    trim: true,
  },
});

// crea JWT per utente registrato
UserSchema.methods.createJWT = () => {
  return jwt.sign({ userId: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// UserSchema.methods.comparePa

module.exports = mongoose.model("User", UserSchema);
