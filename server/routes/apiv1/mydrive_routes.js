const express = require('express');
const router = express.Router();
const token_handler = require("../../middlewares/authMiddleware")
const mydrive_controller = require("../../controllers/apiv1/mydrive")


router.post("/addFolder", token_handler.userTokenCheck, mydrive_controller.addFolder)
router.post("/addDocument", token_handler.userTokenCheck, mydrive_controller.addDocument )
router.get("/get_folders",  token_handler.userTokenCheck, mydrive_controller.get_folders)
router.get("/get_documents",  token_handler.userTokenCheck, mydrive_controller.get_documents)



module.exports = router;