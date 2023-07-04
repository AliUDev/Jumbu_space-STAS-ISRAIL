const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sellers",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gigs",
      required: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payments", paymentSchema);
