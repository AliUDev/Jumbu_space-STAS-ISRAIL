const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { CREATE_USER_SECRET } = require("../../config");

const authMiddleware = require("../../middlewares/auth");
const asyncMiddleware = require("../../middlewares/async");
const User = require("../../models/User");
const { validateUser } = require("../../models/User");

router.get(
  "/me",
  authMiddleware,
  asyncMiddleware(async ({ session }, res) => {
    const user = await User.findById(session.user.id).select("-password");
    res.json(user);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    if (req.body.code !== CREATE_USER_SECRET)
      return res.status(400).json({ message: "Invalid code provided." });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "User already registered!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPasword,
    };

    user = new User(newUser);
    const result = await user.save();
    const parsedResult = result.toJSON();
    delete parsedResult.password;
    res.json(parsedResult);
  })
);

router.post("/change-password", authMiddleware, async (req, res) => {
  const { error } = validatePassword(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findById(req.session?.user?.id);
  if (!user) return res.status(400).json({ message: "User not found!" });

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!validPassword)
    return res.status(400).json({ message: "Incorrect old password!" });

  const salt = await bcrypt.genSalt(10);
  const hashedPasword = await bcrypt.hash(req.body.newPassword, salt);

  user.password = hashedPasword;

  await user.save();

  res.json({ message: "Password changed successfully!" });
});

module.exports = router;

function validatePassword(body) {
  const schema = Joi.object({
    oldPassword: Joi.string().required().label("Old Password"),
    newPassword: Joi.string().min(8).required().label("New Password"),
  });

  return schema.validate(body, { allowUnknown: true });
}































module.exports = router;