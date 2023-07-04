const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const asyncMiddleware = require("../../middlewares/async");

router.get(
  "/customer/:id",
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const orders = await Order.find({ buyer: id }).populate("buyer seller gig");
    res.json({
      orders,
    });
  })
);

router.get(
  "/seller/:id",
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const orders = await Order.find({ seller: id }).populate(
      "buyer seller gig"
    );
    res.json({
      orders,
    });
  })
);
router.get(
  "/empty",
  asyncMiddleware(async (req, res) => {
    await Order.deleteMany({});
    res.send("deleted");
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { buyer, seller, gig, description, duration, budget, status } =
      req.body;
    const order = await Order.create({
      buyer,
      seller,
      gig,
      description,
      duration,
      budget,
      status,
    });
    order.save();
    res.json({
      message: "Order Placed",
      payload: order,
    });
  })
);

module.exports = router;
