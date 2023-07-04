const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    order_details: {
      type: String,
      default: "Custom Order",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customers",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Sellers",
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gigs",
    },
    status: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    duration: {
      type: Date,
      required: true,
    },
    buyerReview: {
      type: String,
    },
    sellerReview: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderSchema);
