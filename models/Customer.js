const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const customerSchema = new Schema({
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
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
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
  spendings: Number,
  jobs: Array,
});

const validateCustomer = function (customer) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).required(),
    country: Joi.string().max(255).required(),
    phone: Joi.string().required(),
    company: Joi.string(),
    type: Joi.string(),
    rating: Joi.number(),
    spendings: Joi.number(),
    jobs: Joi.array().items(Joi.string()).allow(null),
  });

  return schema.validate(customer);
};

module.exports = mongoose.model("Customers", customerSchema);
module.exports.validateCustomer = validateCustomer;













// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   name: String,
//   email: String,
//   password: String,
//   dateOfBirth: Date ,
//   verified: Boolean
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User; 