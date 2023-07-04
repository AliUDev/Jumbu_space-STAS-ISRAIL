const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const notificationSchema = new Schema(
  {
    description: {
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
  },
  { timestamps: true }
);

const validateNotification = function (job) {
  const schema = Joi.object({
    description: Joi.string().required(),
  });

  return schema.validate(job);
};

module.exports = mongoose.model("Notifications", notificationSchema);
module.exports.validateNotification = validateNotification;
