const mongoose = require("mongoose");
const folderModel = require("../../models/mydrive/folderModel");
const documentModel = require("../../models/mydrive/documentModel");
const fs = require("fs");

global.paths = {
  'UPLOAD': __dirname + "/uploads/",
};


exports.addFolder = async (req, res) => {
  var user_id = req.auth_user.user_id;
  req.body.creator = user_id;
  req.body.deleted = false;

  let folder = new folderModel(req.body);
  folder.save((err, data) => {
    if (err) {
      res.status(500).json({
        msg: "Database error occured",
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Folder Created",
      });
    }
  });
};






exports.addDocument = async (req, res) => {
  console.log("req.body", req.body)
  console.log("req.files", req.files)
  var user_id = req.auth_user.user_id;
  

  var file = {}

  if (!req.files.file) return res.status(204).json({ msg: "No content" })

  let sampleFile = req.files.file
  var uploadPath = global.paths.UPLOAD + sampleFile.name;
  console.log("uploadPath", uploadPath)

  sampleFile.mv(uploadPath,  async(err, data)=>{
    if (err) {
      console.log(err)
      res.status(500).json({ msg: "File upload failed" });
    } else {
      console.log("file uploaded to upload folder")
      const readFile = fs.readFileSync(uploadPath);
      console.log("readFile", readFile)

        file.path = uploadPath
        file.name = req.files.file.name,
        file.creator = req.auth_user.user_id,
        file.nested = req.body.nested,
        file.nested_inside = req.body.nested_inside
        file.deleted = false

      let document_to_save =  new documentModel(file);
       let result = await document_to_save.save()
       if(!result) return     res.status(500).json({'msg': 'Database error occured'});
       res.status(200).json({'status': true,'msg': 'Document is saved '})

    }
  });

}


exports.get_folders = async (req, res) => {
  var user_id = req.auth_user.user_id;
  folderModel
    .find({
      creator: user_id,
      nested: false,
      deleted: false,
    })
    .populate("creator")
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          msg: "Database error occured",
        });
      } else {
        res.status(200).json({
          status: true,
          data: data,
        });
      }
    });
};

exports.get_documents = async (req, res) => {
  var user_id = req.auth_user.user_id;
  documentModel
    .find({
      creator: user_id,
      nested: false,
      deleted: false,
    })
    .populate("creator")
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          msg: "Database error occured",
        });
      } else {
        res.status(200).json({
          status: true,
          data: data,
        });
      }
    });
};

