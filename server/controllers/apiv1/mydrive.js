const mongoose = require("mongoose");
const folderModel = require("../../models/mydrive/folderModel");
const documentModel = require("../../models/mydrive/documentModel");


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
     console.log( req.auth_user)



    /*
    // console.log("req.body", req.body)
    // console.log("req.files", req.files)
    var fileSizeInMb =''
    function bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
     // return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
      fileSizeInMb = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
   }
   
    
    var user_id = req.auth_user.user_id;
    var role = req.headers.role;
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    var tempPath = makeid(20);
    req.body.creator = user_id;
    var checksum_data = checksum(req.files.file.data);
    req.body.checksum = checksum_data;
    var file = {};
  
    if (req.files.file) {
      bytesToSize(req.files.file.size)
  
      const extend = ".pdf";
      const only_name_array = req.files.file.name.split(".");
      console.log("only_name_array", only_name_array);
      const only_length = only_name_array.length - 1;
      console.log("only_length", only_length);
      const file_ext = only_name_array[only_length];
      console.log("file_ext", file_ext);
      const only_name = req.files.file.name.replace(`.${file_ext}`, "");
      console.log("only_name", only_name);
      const outputPath = global.paths.UPLOAD + only_name + extend;
      console.log("outputPath", outputPath);
      if (
        file_ext == "doc" ||
        file_ext == "docx" ||
        file_ext == "xls" ||
        file_ext == "xlsx" ||
        file_ext == "ppt" ||
        file_ext == "pptx" ||
        file_ext == "dwg"
      ) {
        var sampleFile = req.files.file;
        console.log(sampleFile);
        var uploadPath = global.paths.UPLOAD + sampleFile.name;
        console.log("uploadPath", uploadPath);
        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            console.log(err)
            // return res.status(500).send(err);
          } else {
            console.log("File uploaded!");
            const readFile = fs.readFileSync(uploadPath);
  
            libre.convert(readFile, extend, undefined, (err, done) => {
              if (err) {
                console.log(`Error converting file: ${err}`);
              } else {
                fs.writeFileSync(outputPath, done);
  
                const fileContent = fs.readFileSync(
                  global.paths.UPLOAD + only_name + extend
                );
      
                var paramsOne = {
                  // saves original files(.doc and ppt etc)
                  file_name: "myDrive" + user_id + "/" + "ext" + tempPath,
                  data: req.files.file.data,
                  mimetype: req.files.file.mimetype,
                };
                var params = {
                  //saves converted files
                  file_name: "myDrive" + user_id + "/" + tempPath,
                  data: fileContent,
                  mimetype: "application/pdf",
                };
  
                  console.log("params", params);
                  file.path = params.file_name
                  file.originalFilePath = paramsOne.file_name
                  file.name = req.files.file.name
                  file.creator = req.auth_user.user_id
                  file.nested = req.body.nested
                  file.nested_inside = req.body.nested_inside
                  file.checksum = checksum_data
                  file.deleted = false
                  file.fileSize = fileSizeInMb
                  aws_s3.uploadMydriveDoc(paramsOne, function (error, response) {})
                  aws_s3.uploadMydriveDoc(params, function (error1, response1) {})
                  fs.unlinkSync(outputPath);
                  fs.unlinkSync(uploadPath);
                  console.log("file obj at diff ext", file)
                  req.body = file;
                  console.log("req.body here", req.body);
                  let document_to_save = new documentModel(req.body);
                  document_to_save.save((err, data) => {
                    if (err) {
                      res.status(500).json({
                        msg: "Database error occured",
                      });
                    } else {
                      console.log("data", data);
                      res.status(200).json({
                        status: true,
                        msg: "Document is created",
                      });
                    }
                  });
  
  
              }
            });
          }
        });
      }else{
  
        var params = {
          file_name: "myDrive" + user_id + "/" + tempPath,
          data: req.files.file.data,
          mimetype: req.files.file.mimetype,
        };
  
        file.path = params.file_name
          file.name = req.files.file.name
          file.creator = req.auth_user.user_id
          file.nested = req.body.nested
          file.nested_inside = req.body.nested_inside
        file.checksum = checksum_data
        file.deleted = false
        file.fileSize = fileSizeInMb
  
        aws_s3.uploadMydriveDoc(params, function (error, response) {
          if (error) {
            console.log(error);
          } else {
            req.body = file;
            console.log("req.body here2 ", req.body )
            let document_to_save = new documentModel(req.body);
            document_to_save.save((err, data) => {
              if (err) {
                res.status(500).json({
                  msg: "Database error occured",
                });
              } else {
                console.log("data", data);
                res.status(200).json({
                  status: true,
                  msg: "Document is created",
                });
              }
            });
          }
        });
  
      }
    }


    */
   
  };
  