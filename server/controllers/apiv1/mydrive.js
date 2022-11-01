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
  // console.log("req.body", req.body)
  // console.log("req.files", req.files)
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





exports.get_fiscal_code = async(req, res)=>{

console.log("req.query", req.query)

let surnameInput = req.query.surnameInput
let nameInput = req.query.nameInput
let dateInput = req.query.DOBInput
let genderInput = req.query.genderInput


let vowels = ["A", "E", "I", "O", "U"]
let consonant = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"]


//Generate 3 capital letters from the surname starts
let surname = surnameInput.toUpperCase()


let tempSurname = ''  //result for surname
let consonantsCount = 0
let found1 = false

//get first three consonants from surname
for (let i = 0; i < surname.length; i++) {
    for (j = 0; j < consonant.length; j++) {
        if (surname[i] == consonant[j]) {
            consonantsCount = consonantsCount + 1
            if (consonantsCount <= 3) {
                tempSurname = tempSurname + surname[i]
            }
        }
    }

}

// if consonant count < 3 in surname
//loop over  surname and vowels --> if 1st vowel of surname match with vowel array-- attach that vowel to tempsurname and break the loop
// (Fox -> FXO | Hope -> HPO).
if (consonantsCount < 3) {
    for (let i = 0; i < surname.length; i++) {
        for (let j = 0; j < vowels.length; j++) {
            if (surname[i] === vowels[j]) {
                found1 = true
                tempSurname = tempSurname + surname[i]
                break;
            }
        }
        if (found1) {
            break
        }
    }
}

// if tempSurname.length<=2  add "X" to end
while (tempSurname.length <= 2) {
    tempSurname = tempSurname + "X"
    tempSurname.length++
}

console.log("final tempSurname", tempSurname)

// surname end ...........*...........



//Generate 3 capital letters from the name starts


let userName = nameInput.toUpperCase()
let tempName = ''              // result for name
let consonantsCountOfName = 0

//get first three consonants from user name 
for (let i = 0; i < userName.length; i++) {
    for (j = 0; j < consonant.length; j++) {
        if (userName[i] === consonant[j]) {
            consonantsCountOfName = consonantsCountOfName + 1
            if (consonantsCountOfName <= 3) {
                tempName = tempName + userName[i]
            }
        }
    }
}


// if consonant count > 3 in name,  first, third and fourth consonant are used
// result tempName will change -- so i am using extra dummy variable to store result of below loop
//(Samantha -> SNT | Thomas -> TMS)
//loop over  name and consonents --> if username matches with consonents skip the 2nd consonant from username
let dummy = ''
let dummyConsonantCount = 0
let dummyFound = false   // if dummy result name >= 3 break the loops 
if (consonantsCountOfName > 3) {

    for (let i = 0; i < userName.length; i++) {
        for (let j = 0; j < consonant.length; j++) {
            if (userName[i] == consonant[j]) {
                dummyConsonantCount++
                if (dummyConsonantCount != 2 && dummy.length <= 3) {
                    dummy = dummy + userName[i]
                    if (dummy.length >= 3) {
                        dummyFound = true
                        break;
                    }
                }
            }
            if (dummyFound) {
                break;
            }
        }
    }
}

if (dummyFound) {
    tempName = dummy             //and finally assign tempName = dummy name (bcz tempname is final result here)
}


// if consonant count < 3 in name  n vowels will replace missing characters 
// (Bob -> BBO | Paula -> PLA)
let found2 = false
if (consonantsCountOfName < 3) {
    for (let i = 0; i < userName.length; i++) {
        for (let j = 0; j < vowels.length; j++) {
            if (userName[i] === vowels[j]) {
                found2 = true
                tempName = tempName + userName[i]
                break;
            }
        }
        if (found2) {
            break
        }
    }
}



// if tempSurname.length<=2  add "X" to end
while (tempName.length <= 2) {
    tempName = tempName + "X"
    tempName.length++
}

console.log("final tempName", tempName)

// name generation end ..............* ..............




//Generate 2 numbers, 1 letter and 2 numbers from date of birth and gender  starts  (5 characters)


let DOB = dateInput.split('/');

let day = DOB[0]
let month = DOB[1]
let year = DOB[2]


let monthObj = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H", 9: "I", 10: "J", 11: "K", 12: "L" };

let tempDOB = ''             //final result for dob and gender

//generate 2 numbers from year and add to tempDOB
for (let i = 0; i < year.length; i++) {
    if (i >= year.length - 2) {
        tempDOB = tempDOB + year[i]
    }
}

//generate 1 letter from month and tempDOB


if (month.length > 1) {
    if (month[0] == 0) {
        month = month.charAt(month.length - 1);
    }
}

for (let key in monthObj) {
   
    if (key == month) {
        tempDOB = tempDOB + monthObj[key]
    }
}


//generate 2 numbers from (day + gender)  M-> (any 9th day -> 09 | any 20th day -> 20).  F->   +40 (any 9th day -> 49 | any 20th day -> 60).


let gender = genderInput.toUpperCase()
if (gender === "M") {
    if (day.length == 1) {
        day = "0" + day
    }
    tempDOB = tempDOB + day

}

if (gender === "F") {
    day = parseInt(day) + 40
    tempDOB = tempDOB + day
}
console.log("final tempDOB", tempDOB)



let finalResult = tempSurname + tempName + tempDOB
console.log("finalResult", finalResult)

res.status(200).json({
  status: true,
  msg: 'fiscal code',
  data:finalResult
});


}
