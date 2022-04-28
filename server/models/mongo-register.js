const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, lastname, email, password, birthDay } = req.body;
    // Registro il nuovo utente nel DB
    const newUser = await User.create({
      name,
      lastname,
      email,
      password,
      birthDay,
    });
    // Creo il token
    const token = newUser.createJWT();
    // ritorno dati utente e token in LocalStorage
    res.status(201).json({
      user: {
        name: newUser.name,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password,
        birthDay: newUser.birthDay,
      },
      token,
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
    res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  // Recupero i dati del form
  const { name, lastname, email, password, birthDay } = req.body;
  // check solo su email & pwd
  if (!email || !password) {
    res.status(500).json({ msg: 'I campi Email e Password sono obbligatori' });
  }
  try {
    // Controllo ne DB se l'utente esiste
    const filtro = {
      email: email,
      password: password,
    };
    const user = await User.findOne({ email }).select('+password');
    // const user = await User.findOne(filtro);
    if (!user) {
      res.status(401).json({ msg: 'Credenziali errate' });
    }
    // Creo il token
    const token = user.createJWT();

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
    res.status(401).json({ msg: 'erorre' });
  }
};

module.exports = { register, login };
