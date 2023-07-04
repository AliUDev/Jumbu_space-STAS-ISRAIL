const express = require("express");
const router = express.Router();
const Payment = require("../../models/Payment");
const GigModel = require("../../models/Gig");
const Order = require("../../models/Order");
const asyncMiddleware = require("../../middlewares/async");
const stripe = require("stripe")(
  "sk_test_51IlruEKN1iWIF1M43Ebos352BSy4HED6RhriEtLY2cVxTvq8cPBOUwumkFT9oo3UiCI80eiffN7nACEKAg8rr5X600BlxwcrcH"
);

const buyGig = asyncMiddleware(async (req, res) => {
  try {
    const { seller, buyer, gig, orderId } = req.body;
    const orderExist = await Order.findById(orderId);
    const gigExist = await GigModel.findById(gig);
    if (gigExist && orderExist) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: gigExist.title,
              },
              unit_amount: gigExist.price * 100,
            },
            quantity: 1,
          },
        ],
        success_url: "http://localhost:3000/pages/orders",
        cancel_url: "http://localhost:3000/payment/cancel",
      });

      const payment = await Payment.create({
        seller,
        buyer,
        amount: gigExist.price,
        gig,
        orderId,
      });

      if (orderExist) {
        orderExist.status = "PAID";
        const updatedOrder = await orderExist.save();
      }

      res.json({ url: session.url });
      // console.log(session);
      if (payment) {
        res.status(201);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const getAllPayments = asyncMiddleware(async (req, res) => {
  const allPayments = await Payment.find({}).populate("gig seller buyer");
  res.json(allPayments);
});

router.post("/checkout", buyGig);
router.get("/", getAllPayments);

module.exports = router;
