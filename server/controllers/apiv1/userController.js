const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const otpModel = require("../../models/userOtpModel");
const nodemailer = require("nodemailer");






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
      userId: user._id,
      // login_time: Date.now()
    };
    const token = jwt.sign(token_data, process.env.JWT_PRIVATEKEY);
    // res.header("auth-token", token).send(token);
    res.status(200).json({
      status: true,
      token: token,
      userData: user
    });
  } else {
    res.status(401).json({ msg: "Invalid credentials" });
  }
};

exports.get_user_profile = async (req, res) => {
  //console.log("get_user_profile");
  const user_id = req.auth_user.userId;
  const user = await userModel.findById(user_id);
 // console.log("userData", user);
  if (!user) return res.status(500).json({ msg: "Database error occured" });
  res.status(200).json({ status: true, data: user });
};

exports.update_user_profile = async (req, res) => {
  const user_id = req.auth_user.userId;
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
  const user_id = req.auth_user.userId;
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




