const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const folderSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    nested: {
        type: Boolean
    },
    nested_inside: {
        type: Schema.Types.ObjectId,
        ref: 'myDriveFolders'
    },
    name: {
        type: String
    },
  
    deleted: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});
module.exports = mongoose.model("myDriveFolders", folderSchema);