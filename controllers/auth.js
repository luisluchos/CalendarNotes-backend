const { response } = require("express");
const User = require("../models/User");

const createUser = async(req, res = reponse) => {
  // const { name, email, password } = req.body;

  try{
    const user = new User(req.body);
  
    await user.save();
  
    return res.status(201).json({
      ok: true,
      msg: "new",
    });


  }catch(error){
    return res.status(400).json({
      ok: false,
      msg:{error},
    });

  }

};

const login = (req, res = reponse) => {
  const { email, password } = req.body;

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
