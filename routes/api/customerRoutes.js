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
const Customer = require("../../models/Customer");
const { validateCustomer } = require("../../models/Customer");

const customerImageUrl = "/media/images/customer/";


function validateSellerImageFile(file) {
  if (!file.image) return "Customer Image is required!";
  return null;
}

const uploadSellerImageMiddleware = imagesUploader(
  validateCustomer,
  "/customer"
).fields([{ name: "image", maxCount: 1 }]);

router.get(
  "/",
  asyncMiddleware(async (_, res) => {
    const response = await Customer.find();
    res.json(response);
  })
);

router.get(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;
    const response = await Customer.findById(customerID);
    res.json(response || {});
  })
);

router.get(
  "/:id/jobs",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;
    const response = await Job.find({ customerID: customerID });
    res.json(response);
  })
);

router.put(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;

    uploadSellerImageMiddleware(req, res, async (err) => {
      if (err)
        return err.code === "LIMIT_FILE_SIZE"
          ? res
              .status(400)
              .json({ message: "File too large. Must be less than 200 KB" })
          : res.status(400).json({ message: err.message });

      if (isEmpty(req.files)) {
        const { error } = validateCustomer(req.body);
        if (error)
          return res.status(400).json({ message: error.details[0].message });
      }

      const customerExist = await Customer.findById(customerID);

      if (customerExist) {
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
          const customerImage = {
            path: req.files.image[0].path,
            url: customerImageUrl + req.files.image[0].filename,
            filename: req.files.image[0].originalname,
          };
          payload.image = customerImage;
        }

        const result = await Customer.findByIdAndUpdate(customerID, {
          $set: payload,
        });

        if (req.files.image && result.image) removeFile(result.image.path);

        res.json({ message: "Customer Updated Successfully!" });
      }
    });
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    uploadSellerImageMiddleware(req, res, async (err) => {
      if (err)
        return err.code === "LIMIT_FILE_SIZE"
          ? res
              .status(400)
              .json({ message: "File too large. Must be less than 200 KB" })
          : res.status(400).json({ message: err.message });

      if (isEmpty(req.files)) {
        const { error } = validateCustomer(req.body);
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
        const customerImage = {
          path: req.files.image[0].path,
          url: customerImageUrl + req.files.image[0].filename,
          filename: req.files.image[0].originalname,
        };
        payload.image = customerImage;
      }

      const notificationPayload = {
        description: `New Customer (${payload.username}) joined`,
        image: payload.image,
      };

      const error = validateSellerImageFile(req.files);
      if (error) return res.status(400).json({ message: error });

      const customer = new Customer(payload);
      await customer.save()

      .then((result, res)=>{
       return  sendOTPVerificationEmail(result, res);
       
      })
      .catch((err)=>{
        res.json({
          status:"Failed",
          message:"An error occured while saving user account",
          err,
        })
      })
       

      const notification = new Notification(notificationPayload);
      await notification.save();

      res.json({ message: "Customer Added Successfully!!!" });
    });
  })
);

router.delete(
  "/:id",
  validateId,
  asyncMiddleware(async (req, res) => {
    const customerID = req.params.id;
    const result = await Customer.findByIdAndDelete(customerID);

    if (result.image) removeFile(result.image.path);

    res.json({ id: result._id } || {});
  })
);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// //mongodb user model
// const User = require("../../models/User");

// //signup
// router.post("/signup", (req,res)=>{
//   let {name, email,password, dateOfBirth} = req.body;
//   name = name.trim();
//   email = email.trim();
//   password = password.trim();
//   dateOfBirth = dateOfBirth.trim();

//   if(name == "" || password=="" || email == "" || dateOfBirth== "" ){
//     res.json({
//       status:"Failed",
//       message:"Empty Input Fields"
//     })
//   }else if (!/^[a-zA-Z]*$/.test(name)){
//     res.json({
//       status:"Failed",
//       message:"Invalid name entered",
//     })
//   }else if (!/^[\w-\.]+(@[\w-]+\.)+[\w-]{2,4}$/.test(email)){
//     res.json({
//       status:"Failed",
//       message:"Invalid email entered",
//     })
//   }else if (!new Date(dateOfBirth).getTime()){
//     res.json({
//       status:"Failed",
//       message:"Invalid date of birth entered",
//     })
//   }else if(password.length<8){
//     res.json({
//       status:"Failed",
//       message:"Password must be 8 numbers",
//     })
//   }else

//   // checking if user already exist
//   User.find({email})
//   .then((result)=>{
//     if(result.length){
//       res.json({
//         status:"Failed",
//         message:"User already exsists",
//       });
//     }else{
//       //try to create a new user
//       const saltRounds = 10;
//       bcrypt
//       .hash(password, saltRounds)
//       .then((hashedPassword)=>{
//         const newUser = new User({
//           name,
//           email,
//           password: hashedPassword,
//           dateOfBirth,
//           verified:false,
//         });
//         newUser
//         .save()
//         .then((result)=>{
//           //handle account verification
//           // sendVerificationEmail(result, res);
//           sendOTPVerificationEmail(result, res);
//         })
//         .catch((err)=>{
//           console.log(err);
//           res.json({
//             status:"Failed",
//             message:"An error occured while saving user account",
//             err,

//           });
//         });
//       })
//       .catch((err)=>{
//         res.json({
//           status:"Failed",
//           message:"An error occured while hashing password",
//           err,

//         });
//       });
//     }
//   })
//   .catch((err)=>{
//     console.log(err);
//     res.json({
//         status:"Failed",
//         message:"An error occured while checking existing user",
//     })
//   })
// });

//verify otp
router.post("/verifyOTP", async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty OTP details are not allowed!");
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        //no record found
        throw new Error(
          "Account record doesn't exist or has been verified already. Please Signup or login.  "
        );
      } else {
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userId });
          throw new Error("Code has expired, Please request again");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            throw new Error("Invalid code passed, check you email inbox");
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPVerification.deleteMany({ userId });
            res.json({
              status: "Verified",
              message: "User Email verified successfully",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "------------Failed-------------",
      message: error.message,
    });
  }
});

//resend the verification code

router.post("/resendOTPVerificationCode", async (req, res) => {
  try {
    let { userId, email } = req.body;
    if (!userId || !email) {
      throw Error("Empty user details are not allowed");
    } else {
      await UserOTPVerification.deleteMany({ userId });
      sendOTPVerificationEmail({ _id: userId, email }, res);
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});
