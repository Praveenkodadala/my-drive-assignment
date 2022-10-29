

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var user = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName:{ type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
  
    logoUrl: { type: String, default: "assets/images/default.png"},
    status: { type: Boolean }, // dummy pupose
    checked: { type: Boolean, default: false }, // dummy pupose
    disabled  : { type: Boolean, default: false} , // dummy pupose
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' }, // dummy pupose
},
{
    timestamps: true
});

module.exports = mongoose.model("users", user);
