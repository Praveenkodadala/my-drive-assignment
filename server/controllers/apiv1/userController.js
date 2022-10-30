const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const otpModel = require("../../models/userOtpModel");
const nodemailer = require("nodemailer");

//400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found 
//200 sucess 
//500 db error


exports.user_register = async (req, res) => {
    // console.log("req.body user_register ", req.body);
  const user = await userModel.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({
      msg: "Email already exists",
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;

  const createUser = new userModel(req.body);
  try {
    const savedUser = await createUser.save();
    res.status(200).json({
      status: true,
      msg: "User added successfully!, Please login with credentials",
      data: savedUser._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Database error occured" });
  }
};

exports.user_login = async (req, res) => {
 // console.log("req.body", req.body);
  var user = await userModel.findOne({ email: req.body.email });
  if (!user)
    return res.status(401).json({
      msg: "Invalid credentials",
    });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token_data = {
      user_id: user._id,
      // login_time: Date.now()
    };
    const token = jwt.sign(token_data, process.env.JWT_PRIVATEKEY);
    // res.header("auth-token", token).send(token);

    var output = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      userId: user._id,
      email: user.email,
      // data: user
    };
    console.log("output", output)
    res.status(200).json({
      status: true,
      token: token,
      userData: output
    });
  } else {
    res.status(401).json({ msg: "Invalid credentials" });
  }
};

exports.get_user_profile = async (req, res) => {
  //console.log("get_user_profile");
  const user_id = req.auth_user.user_id;
  const user = await userModel.findById(user_id);
 // console.log("userData", user);
  if (!user) return res.status(500).json({ msg: "Database error occured" });
  res.status(200).json({ status: true, data: user });
};

exports.update_user_profile = async (req, res) => {
  const user_id = req.auth_user.user_id;
  // console.log("req.body", req.body);
  userModel.updateOne(
    { _id: user_id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Database error occured" });
      } else {
        res.status(200).json({ status: true, msg: "User is updated" });
      }
    }
  );
};

exports.update_user_password = async (req, res) => {
 // console.log("req.body", req.body);
  const user_id = req.auth_user.user_id;
  var user = await userModel.findById(user_id);
  if (!user) return res.status(500).json({ msg: "Database error occured" });
  const validPass = await bcrypt.compare(req.body.oldpassword, user.password);
  // console.log("validPass", validPass)
  if (!validPass)
    return res
      .status(401)
      .json({
        status: false,
        msg: "The old password you have entered is incorrect",
      });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);
  //console.log("hashedPassword", hashedPassword)
  userModel.updateOne(
    { _id: user_id },
    { $set: { password: hashedPassword } },
    (err1, data1) => {
      if (err1) {
        console.log(err1);
        res.status(500).json({ msg: "Database error occured" });
      } else {
        res.status(200).json({ status: true, msg: "Password is changed" });
      }
    }
  );
};


exports.forget_password = async (req, res) => {


  console.log("req.body", req.body);
  const user = await userModel.findOne({ email: req.body.email });
  console.log(user);
  if (!user)
    return res.status(401).json({ status: false, msg: "Invalid Email" });
  const CreateOtp = new otpModel({
    userId: user._id,
    email: req.body.email,
    code: Math.floor(1000 + Math.random() * 9000),
    expiresIn: new Date().getTime() + 300 * 1000, //expires in 5 min
  });
  const otpResponse = await CreateOtp.save();
  console.log("otpResponse", otpResponse)
  if (!otpResponse) res.status(500).json({ msg: "Database error occured" });

  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'apikey', // generated ethereal user
        pass: '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' // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(
      {
        from: '"My drive system" <admin@moxiedb.com>',
        to: req.body.email,
        subject: "moxievq otp", // Subject line
        text: otpResponse.code,
        // html: "<b>Hello world?</b>", // html body
      },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "Database error occured" });
        } else {
          res
            .status(200)
            .json({ status: true, msg: "Please check your email" });
        }
      }
    );

  }

  main().catch(console.error);

  // res.status(200).json({ status: true, msg: "Please check your email" })
};


exports.change_password_by_otp = async (req, res) => {
  // console.log("req.body change_password_by_otp", req.body);
  const otpData = await otpModel.findOne({
    email: req.body.email,
    code: req.body.otpCode,
  });
   console.log("otpData", otpData);
  if (otpData) {
    let currentTime = new Date().getTime();
    let diff = otpData.expiresIn - currentTime;
    if (diff < 0) {
      res.status(200).json({ status: false, msg: "Otp is expired" });
    } else {
      const user = await userModel.findOne({ email: req.body.email });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);
      user.password = hashedPassword; //store hashed password
      user.save();

      const findOtpModel = await otpModel.remove(
        { userId: user._id },
        { justOne: false }
      );

      res
        .status(200)
        .json({ status: true, msg: "Password has been changed successfully" });
    }
  } else {
    res.status(401).json({ status: false, msg: "Invalid Otp" });
  }
};



