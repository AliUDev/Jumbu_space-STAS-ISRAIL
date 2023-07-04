const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const messageSchema = new Schema(
  {
    conversationID: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    status: String,
  },
  { timestamps: true }
);

const validateMessage = function (message) {
  const schema = Joi.object({
    conversationID: Joi.string().required(),
    sender: Joi.string().required(),
    text: Joi.string().required(),
  });

  return schema.validate(message);
};

module.exports = mongoose.model("Messages", messageSchema);
module.exports.validateMessage = validateMessage;
