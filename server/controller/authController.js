const User = require('../models/User');
const mongoAuth = require('../models/mongo-register');

const register = async (req, res) => {
  try {
    // Chiamo func per registrare il nuovo utente
    mongoAuth.register(req, res);
  } catch (err) {
    if (err) {
      console.log(err);
    }
    // res.status(500).json({ msg: "C'è un errore" });
    res.status(500).send(err.msg);
  }
};
const login = async (req, res) => {
  try {
    // Chiamo func per controllo login
    mongoAuth.login(req, res);
  } catch (err) {
    if (err) {
      console.log(err);
    }
    return res.status(500).json({ msg: `c'è stato un errore` });
  }
};

module.exports = { register, login };
