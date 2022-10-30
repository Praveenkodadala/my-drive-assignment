const jwt = require("jsonwebtoken");

module.exports.userTokenCheck = function (req, res, next) {
  // console.log("req", req.headers.authorization)


  const token = req.headers.authorization // token has userid as payload
  if (!token) return res.status(401).send("Access denied");
  
  /*
  let authorization = req.headers.authorization.split(' ')[1]   //if we user bearer <token>
  let decoded = jwt.verify(authorization, privateKey);
  console.log(decoded);
  */
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
   // console.log("decoded ", decoded);
    req.auth_user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
