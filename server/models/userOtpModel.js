const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userOtp = new Schema(
  {
    userId :{type: Schema.Types.ObjectId, ref: 'users'},
    email: { type: String, required: true },
    code:{ type: String, required: true },
    expiresIn:{ type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userOtps", userOtp);
