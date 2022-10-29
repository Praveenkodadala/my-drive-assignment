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
      userId: user._id,
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
        res.status(200).json({ status: true, msg: "Password changed" });
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
  if (!otpResponse) res.status(500).json({ msg: "Database error occured" });

  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "praveen4ne1@gmail.com", // generated ethereal user
        pass: "9440061806", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(
      {
        from: "moxievq@gmail.com",
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

    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);

  // res.status(200).json({ status: true, msg: "Please check your email" })
};

exports.change_password_by_otp = async (req, res) => {
  console.log("req.body", req.body);
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
      res
        .status(200)
        .json({ status: true, msg: "Password changed successfully" });
    }
  } else {
    res.status(401).json({ status: false, msg: "Invalid Otp" });
  }
};


/*
exports.get_user_profile = async(req, res) => {

  var user_id = req.auth_user.userId;
  console.log("userid", user_id);
  userModel
    .findById(user_id)
    .populate("orgId").populate("createdBy")
    .exec(async function (error, data) {
      if (error) {
        res.status(500).json({ msg: "Internal server error" });
      } else {
        console.log("get_user_profile data", data);
        if (!data.disabled) {
          var roles = await userRolesModel.find({ userId: user_id });
          //  console.log("get user profile  roles", roles)
          if (roles.length > 0) {
            if (roles[0].userRole == "sadmin") {
              var output = {
                userName: data.userName,
                firstName: data.firstName,
                userId: data._id,
                lastName: data.lastName,
                email: data.email,
                designation: data.designation,
                role: roles,
                multiRole: data.multiRole,
                workingLocation: data.workingLocation,
                logoUrl: data.logoUrl,
                phone: data.phone,
              };
            } else {
              var output = {
                userName: data.userName,
                firstName: data.firstName,
                lastName: data.lastName,
                userId: data._id,
                orgId: data.orgId._id,
                orgName: data.orgId.orgName,
                orgLogo: data.orgId.orgLogo,
                phone: data.phone,
                employeeId: data.employeeId,
                email: data.email,
                designation: data.designation,
                role: roles,
                multiRole: data.multiRole,
                workingLocation: data.workingLocation,
                logoUrl: data.logoUrl,
                userConsent: data.userConsent,
              };
            }
            res.status(200).json({ status: true, data: output });
          } else {
            res
              .status(200)
              .json({ status: false, msg: "Contact your administrator!" });
          }
        } else {
          res
            .status(200)
            .json({
              status: false,
              data: { user_disabled: true, fullUserData: data },
              msg: "Contact your administrator!",
            });
        }
      }
    });
};
*/



//
exports.get_user_module_permissions = (req, res) => {
  var user_id = req.auth_user.userId;
  var role = req.headers.role;
 // console.log(req.headers, req.auth_user)
//  console.log("req.headers", req.headers)
//  console.log("user_id", user_id)
//  console.log("role", role)

  casbinAccessModulesModel.find(
    { v0: user_id, forRole: role },
    function (error, data) {
      if (error) {
        res.status(500).json({ msg: "Internal server error" });
      } else {
        var new_output = [];
        //console.log("data of modules", data)
        for (var i = 0; i < data.length; i++) {
            var obj = {
              title: data[i]["title"],
              key: data[i]["key"],
              url: data[i]["url"],
              icon: data[i]["icon"],
              forRole: data[i]["forRole"],
              ptype: data[i]["ptype"],
              v0: data[i]["v0"],
              v1: data[i]["v1"],
              v2: data[i]["v2"],
              v3: data[i]["v3"],
            };
            new_output.push(obj);
        }
        res.status(200).json({ status: true, data: new_output });
      }
    }
  );
};



exports.createSadmin = async(req, res)=>{   //creating sadmin using postman http://localhost:3000/api/apiv1/user/create_sadmin
 // console.log("req.body", req.body);
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
       msg: "User added successfully!",
       data: savedUser._id,
     });
   } catch (err) {
     console.log(err);
     res.status(500).json({ msg: "Database error occured" });
   }

}

exports.createSadmin_userRole = async(req, res)=>{   //creating user role for s admin using postman
  //console.log("req.body", req.body);
  const createUserRole = new userRolesModel(req.body)
  try{
    const saveUserRole = await createUserRole.save()
    res.status(200).json({
      status: true,
      msg: "User role added successfully!",
    });
  }catch(err){
    console.log(err);
    res.status(500).json({ msg: "Database error occured" });
  }
}

exports.createCasbinAccessModules = async(req, res)=>{
//  console.log("req.body", req.body)
    const CasbinAccessModules = new casbinAccessModulesModel(req.body)
    try{
      const saveCasbinAccessModules= await CasbinAccessModules.save()
      res.status(200).json({
        status: true,
        msg: "CasbinAccessModules added successfully!",
        
      });
    }catch(err){
      console.log(err);
      res.status(500).json({ msg: "Database error occured" });
    }

}
