const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");
  console.log("tokenRev:", token);

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    console.log("Payload", payload);
    //pasasmos al req el uid
    req.uid = payload.uid;
    req.name = payload.name;

    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};

module.exports = { validateJWT };
