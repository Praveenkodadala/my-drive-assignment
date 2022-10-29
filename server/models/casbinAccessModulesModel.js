const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var casbinAccessModules = new Schema({
   // ModuleId: { type: Schema.Types.ObjectId, ref: 'existModules' },
   // UserId: { type: Schema.Types.ObjectId, ref: 'users' },
   title: { type: String },
   key: { type: String },
   url: { type: String },
   icon: { type: String },
   forRole: { type: String },
   isChild: { type: Boolean },
   parent: { type: String },
   ptype: { type: String },  // if policy it is p
   v0: { type: String },     // subject means user
   v1: { type: String },     // object means module 
   v2: { type: String },     // action means what kind of action it is like forword,create,delete,view,download
   v3: { type: String },     // optional perameter 
   v4: { type: String }    // optional parameter
   // children: [
   //    {
   //       title: { type: String },
   //       key: { type: String },
   //       url: { type: String },
   //    },
   // ]
});

module.exports = mongoose.model("casbin-access-modules", casbinAccessModules);


// example {p, 123456, request, yes}, {p, 123456, doc_lib, yes}, 




