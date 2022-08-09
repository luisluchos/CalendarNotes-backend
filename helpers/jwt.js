const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {

  return new Promise((resolve, reject) => {

    const payload = { uid, name };
        console.log(payload);
    jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: "3h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(token);
    });
  });
};

module.exports = {
  generateJWT,
};
