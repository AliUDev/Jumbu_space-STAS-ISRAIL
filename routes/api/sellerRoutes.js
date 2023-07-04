const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const asyncMiddleware = require("../../middlewares/async");
const imagesUploader = require("../../helpers/imagesUploader");
const validateId = require("../../middlewares/validateId");
const isEmpty = require("../../helpers/isEmpty");
const removeFile = require("../../helpers/removeFile");

const Job = require("../../models/Job");
const Notification = require("../../models/Notification");
const Seller = require("../../models/Seller");
const { validateSeller } = require("../../models/Seller");

const sellerImageUrl = "/media/images/seller/";

function validateSellerImageFile(file) {
  if (!file.image) return "Seller Image is required!";
  return null;
}

const uploadSellerImageMiddleware = imagesUploader(
  validateSeller,
  "/seller"
).fields([{ name: "image", maxCount: 1 }]);

router.get(
  "/",
  asyncMiddleware(async (_, res) => {
    const response = await Seller.find();
    res.json(response);
  })
);

router.get(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const sellerID = req.params.id;
    const response = await Seller.findById(sellerID);
    res.json(response || {});
  })
);

router.get(
  "/:id/jobs",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;
    const response = await Job.find({ sellerID: customerID });
    res.json(response);
  })
);

router.put(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const sellerID = req.params.id;

    uploadSellerImageMiddleware(req, res, async (err) => {
      if (err)
        return err.code === "LIMIT_FILE_SIZE"
          ? res
            .status(400)
            .json({ message: "File too large. Must be less than 200 KB" })
          : res.status(400).json({ message: err.message });

      if (isEmpty(req.files)) {
        const { error } = validateSeller(req.body);
        if (error)
          return res.status(400).json({ message: error.details[0].message });
      }

      const sellerExist = await Seller.findById(sellerID);

      if (sellerExist) {
        const payload = {
          fullName: req.body.fullName,
          username: req.body.username,
          email: req.body.email,
          country: req.body.country,
          phone: req.body.phone,
          company: req.body.company,
          rating: req.body.rating,
          jobs: req.body.jobs,
        };

        if (req.files.image) {
          const sellerImage = {
            path: req.files.image[0].path,
            url: sellerImageUrl + req.files.image[0].filename,
            filename: req.files.image[0].originalname,
          };
          payload.image = sellerImage;
        }

        const result = await Seller.findByIdAndUpdate(sellerID, {
          $set: payload,
        });

        if (req.files.image && result.image) removeFile(result.image.path);

        res.json({ message: "Seller Updated Successfully!" });
      }
    });
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    console.log("00000000000000");
    uploadSellerImageMiddleware(req, res, async (err) => {
      if (err)
        return err.code === "LIMIT_FILE_SIZE"
          ? res
            .status(400)
            .json({ message: "File too large. Must be less than 200 KB" })
          : res.status(400).json({ message: err.message });

      if (isEmpty(req.files)) {
        const { error } = validateSeller(req.body);
        if (error)
          return res.status(400).json({ message: error.details[0].message });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPasword = await bcrypt.hash(req.body.password, salt);

      const payload = {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPasword,
        country: req.body.country,
        phone: req.body.phone,
        company: req.body.company,
        rating: req.body.rating,
        jobs: req.body.jobs,
      };

      if (req.files.image) {
        const sellerImage = {
          path: req.files.image[0].path,
          url: sellerImageUrl + req.files.image[0].filename,
          filename: req.files.image[0].originalname,
        };
        payload.image = sellerImage;
      }

      const notificationPayload = {
        description: `New Seller (${payload.username}) joined`,
        image: payload.image,
      };

      const error = validateSellerImageFile(req.files);
      if (error) return res.status(400).json({ message: error });

      const seller = new Seller(payload);
      await seller.save();

      const notification = new Notification(notificationPayload);
      await notification.save();

      res.json({ message: "Seller Added Successfully!" });
    });
  })
);

router.delete(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const sellerID = req.params.id;
    const result = await Seller.findByIdAndDelete(sellerID);

    if (result.image) removeFile(result.image.path);

    res.json({ id: result._id } || {});
  })
);

router.get(
  "/skills/add",
  asyncMiddleware(async (req, res) => {
    // const user = await Seller.findById();
    res.send("jai");
  })
);

module.exports = router;
