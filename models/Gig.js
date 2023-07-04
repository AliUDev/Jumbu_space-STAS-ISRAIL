const mongoose = require("mongoose");

const gigSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Sellers",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
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
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Gigs", gigSchema);
