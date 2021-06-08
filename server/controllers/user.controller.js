const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const userModel = new UserModel(); // username: admin, password: admin

    const user = userModel.findUser(username);
    if (!user) {
      res.status(404).send({ error: "User doesn't exist!" });
      return;
    }

    const validPass = user.validPass(password); // true/false

    if (validPass) {
      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.status(200).send({ auth: true, token: token });
    } else {
      res.status(401).send({ auth: false, token: null });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

module.exports = {
  login,
};
