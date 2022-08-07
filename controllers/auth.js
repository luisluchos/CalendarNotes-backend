const { response } = require("express");
const {validationResult} = require('express-validator');

const createUser = (req, res = reponse) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  return res.json({
    ok: true,
    msg: "new",
    name,
    email,
    password,
  });
};

const login = (req, res = reponse) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })};

  return res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const renewToken = (req, res = reponse) => {
  return res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = { createUser, login, renewToken };
