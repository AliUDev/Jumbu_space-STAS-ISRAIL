const express = require("express");
const router = express.Router();
const Gig = require("../../models/Gig");
const multer = require("multer");
const asyncMiddleware = require("../../middlewares/async");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/media/images/gigs/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const gigUrl = "/media/images/gigs/";

router.post(
  "/upload",
  upload.single("image"),
  asyncMiddleware(async (req, res) => {
    console.log(req.file);
    const { title, description, price, user } = req.body;
    const gig = await Gig.create({
      user,
      title,
      description,
      price,
      image: {
        path: req.file.path,
        url: gigUrl + req.file.originalname,
        filename: req.file.originalname,
      },
    });

    if (gig) {
      res.json(gig);
    }
  })
);

router.get(
  "/",
  asyncMiddleware(
    asyncMiddleware(async (req, res) => {
      const gig = await Gig.find({}).populate("user");
      if (Object.keys(gig).length) return res.status(200).json(gig);
      return res.status(404).json({
        error: "No Gig Found",
      });
    })
  )
);

router.get(
  "/:id",
  asyncMiddleware(
    asyncMiddleware(async (req, res) => {
      const gig = await Gig.findOne({ _id: req.params.id }).populate("user");
      if (Object.keys(gig).length) return res.status(200).json(gig);
      return res.status(404).json({
        error: "No Gig Found",
      });
    })
  )
);

router.post(
  "/",
  asyncMiddleware(
    asyncMiddleware(async (req, res) => {
      const gig = await Gig.find({ user: req.body.id }).populate("user");
      if (Object.keys(gig).length) return res.status(200).json(gig);
      return res.status(404).json({
        error: "No Gig Found",
      });
    })
  )
);

router.get(
  "/empty",
  asyncMiddleware(async (req, res) => {
    const gig = await Gig.deleteMany({});
    res.json("deleted");
  })
);

module.exports = router;
