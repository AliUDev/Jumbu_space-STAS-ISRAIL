const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversations", conversationSchema);
