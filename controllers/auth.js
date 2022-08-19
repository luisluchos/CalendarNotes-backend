const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }

    user = new User(req.body);

    //encriptar password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //generar token
    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: { error },
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario o contraseña no son correctos",
      });
    }

    //comparar password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario o contraseña no son correctos",
      });
    }

    //generar token
    const token = await generateJWT(user.id, user.name);

    return res.json({
      ok: true,
      msg: "login",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: { error },
    });
  }
};

const renewToken = async (req, res = response) => {
  //recogemos el uid que se le pasó a través del middleware validateJWT
  const { uid, name } = req;
  //generar token
  const token = await generateJWT(uid, name);

  return res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = { createUser, login, renewToken };
