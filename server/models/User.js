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
});

// prima di salvare faccio hash
UserSchema.pre('save', async function () {
    const hashPwd = await bcrypt.hash(this.password, 10);
    this.password = hashPwd;
    this.password = bcrypt.compare(this.password, hashPwd);
});

// crea JWT per utente registrato
UserSchema.methods.createJWT = () => {
    return jwt.sign({ userId: this._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};

// Confronto la pwd
UserSchema.methods.comparePassword = async function (candidate) {
    const isMatch = await bcrypt.compare(candidate, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
