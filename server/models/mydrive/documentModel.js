const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var documentSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    path: {
        type: String
    },
    originalFilePath:{       // this is for .doc and ppt and etc files  other than pdf png jpg
        type: String 
    },
    nested: {
        type: Boolean
    },
    nested_inside: {
        type: Schema.Types.ObjectId,
        ref: 'myDriveFolders'
    },
    checksum: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    fileSize : {
        type: String  
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("myDriveDocuments", documentSchema);