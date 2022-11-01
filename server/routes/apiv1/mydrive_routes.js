const express = require('express');
const router = express.Router();
const token_handler = require("../../middlewares/authMiddleware")
const mydrive_controller = require("../../controllers/apiv1/mydrive")


router.post("/addFolder", token_handler.userTokenCheck, mydrive_controller.addFolder)
router.post("/addDocument", token_handler.userTokenCheck, mydrive_controller.addDocument )
router.get("/get_folders",  token_handler.userTokenCheck, mydrive_controller.get_folders)
router.get("/get_documents",  token_handler.userTokenCheck, mydrive_controller.get_documents)
router.get('/folderItems', token_handler.userTokenCheck, mydrive_controller.get_nested_folders, mydrive_controller.get_nested_documents, (req, res) =>{
    res.status(200).json({ 'status': true, 'data': {'folders': Folderdata, documents: documentData} });
})

router.post("/delete_file_or_doc", token_handler.userTokenCheck, mydrive_controller.delete_file_or_doc )


router.get("/folderDetails",  token_handler.userTokenCheck, mydrive_controller.folderDetails)


// fiscal code generator api
router.get("/get_fiscal_code",   mydrive_controller.get_fiscal_code)


module.exports = router;