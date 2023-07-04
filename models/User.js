const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
});

const validateUser = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().max(255).required(),
    code: Joi.string().max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

module.exports = mongoose.model("User", userSchema);
module.exports.validateUser = validateUser;

