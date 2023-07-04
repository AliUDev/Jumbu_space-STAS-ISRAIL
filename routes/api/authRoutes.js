const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { SESS_NAME } = require("../../config");

const auth = require("../../middlewares/auth");
const asyncMiddleware = require("../../middlewares/async");
const User = require("../../models/User");

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Invalid Email or Password!" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).json({ message: "Invalid Email or Password!" });

    sessionUser = {
      id: user._id,
      name: user.name,
    };

    req.session.user = sessionUser;
    res.json(sessionUser);
  })
);

router.delete("/", auth, ({ session }, res) => {
  const user = session.user;
  if (user) {
    session.destroy((err) => {
      if (err) throw err;
      res.clearCookie(SESS_NAME);
      res.json({ message: "User Logged out successfully!" });
    });
  } else {
    res.status(400).json({ message: "User already logged out!" });
  }
});

router.get("/", ({ session: { user } }, res) => {
  res.json(user);
});

module.exports = router;

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(req);
}
