const mongoose = require("mongoose");
const folderModel = require("../../models/mydrive/folderModel");
const documentModel = require("../../models/mydrive/documentModel");
const fs = require("fs");

global.paths = {
  UPLOAD: __dirname + "/uploads/",
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

  var file = {};

  if (!req.files.file) return res.status(204).json({ msg: "No content" });

  let sampleFile = req.files.file;
  var uploadPath = global.paths.UPLOAD + sampleFile.name;
  console.log("uploadPath", uploadPath);

  sampleFile.mv(uploadPath, async (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "File upload failed" });
    } else {
      console.log("file uploaded to upload folder");
      const readFile = fs.readFileSync(uploadPath);
      console.log("readFile", readFile);

      file.path = "uploads/" + sampleFile.name;
      (file.name = req.files.file.name),
        (file.creator = req.auth_user.user_id),
        (file.nested = req.body.nested),
        (file.nested_inside = req.body.nested_inside);
      file.deleted = false;

      let document_to_save = new documentModel(file);
      let result = await document_to_save.save();
      if (!result)
        return res.status(500).json({ msg: "Database error occured" });
      res.status(200).json({ status: true, msg: "Document is saved " });
    }
  });
};

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

exports.get_nested_folders = async (req, res, next) => {
  console.log("req.query", req.query);
  var user_id = req.auth_user.user_id;
  const folder_id = req.query.folder_id;

  folderModel
    .find({
      nested: true,
      nested_inside: folder_id,
      deleted: false,
    })
    .populate("creator")
    .populate("nested_inside")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          msg: "Database error occured",
        });
      }
      Folderdata = data;
      next();
    });
};

exports.get_nested_documents = async (req, res, next) => {
  console.log("req.query", req.query);
  var user_id = req.auth_user.user_id;
  const folder_id = req.query.folder_id;
  documentModel
    .find({
      nested: true,
      nested_inside: folder_id,
      deleted: false,
    })
    .populate("creator")
    .populate("nested_inside")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          msg: "Database error occured",
        });
      }
      documentData = data;
      next();
    });
};


exports.folderDetails = async (req, res) => {
  // console.log('req.query folderDetails', req.query)
  const folderId = req.query.folder_id;
  let folderDetails = await folderModel.findById(req.query.folder_id);
  if (!folderDetails) {
    console.log("error in fetching folder details");
  } else {
    res.status(200).json({
      status: true,
      data: folderDetails,
    });
  }
};


exports.delete_file_or_doc = async (req, res) => {
  try{
    let file_Delete =  documentModel.updateOne({_id:req.body.id},{$set:{deleted:true}})
    let folder_Delete =  folderModel.updateOne({_id:req.body.id},{$set:{deleted:true}})
    let [file_Delete_result, folder_Delete_result] = await Promise.all([file_Delete, folder_Delete])
    res.status(200).json({
      status: true,
      msg: 'deleted',
    });

  }catch(err){
       console.log(err)
       res.status(500).json({
        msg: "Database error occured",
      });
  }

}

