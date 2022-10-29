const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userRole = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    userRole: { type: String, required: true },
    userRoleName: { type: String, required: true },
    docSelfApproval: { type: Boolean },
    createdOn: { type: Date, default: Date.now },
    status: { type: Boolean }
});

module.exports = mongoose.model("user-roles", userRole);
