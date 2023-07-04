const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const sellerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    default: [],
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: {
      path: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      filename: String,
    },
  },
  company: String,
  rating: Number,
  earnings: Number,
  jobs: Array,
});

const validateSeller = function (seller) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).required(),
    country: Joi.string().max(255).required(),
    phone: Joi.string().required(),
    company: Joi.string().allow(""),
    type: Joi.string(),
    rating: Joi.number(),
    earnings: Joi.number(),
    jobs: Joi.array().items(Joi.string()).allow(null),
    skills: Joi.array().items(Joi.string()).allow(null),
  });

  return schema.validate(seller);
};

module.exports = mongoose.model("Sellers", sellerSchema);
module.exports.validateSeller = validateSeller;
