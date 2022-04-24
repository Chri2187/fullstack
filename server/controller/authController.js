const User = require("../models/User");
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, lastname, email, birthDay } = req.body;
    const newUser = await User.create({ name, lastname, email, birthDay });
    const token = newUser.createJWT();
    res.status(201).json({
      user: {
        name: newUser.name,
        lastname: newUser.lastname,
        email: newUser.email,
        birthDay: newUser.birthDay,
      },
      token,
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(500).json({ msg: "C'è un errore" });
  }
};
const login = async (req, res) => {
  const { name, lastname, email, birthDay } = req.body;
  if (!name || !lastname || !email || !birthDay) {
    res.status(500).json({ msg: "Inserire tutti i campi" });
  }

  const user = await User.findOne({ name, lastname, email, birthDay }).select(
    "name lastname email birthDay"
  );
  if (!user) {
    res.status(401).json({ msg: "Credenziali errate" });
  }

  const token = user.createJWT();

  res.status(200).json({
    user,
    token,
  });
};

module.exports = { register, login };
