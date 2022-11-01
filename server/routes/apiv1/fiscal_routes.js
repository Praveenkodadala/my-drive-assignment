const express = require('express');
const router = express.Router();
const fiscal_controller = require("../../controllers/apiv1/fiscal")


// fiscal code generator api
router.get("/get_fiscal_code",   fiscal_controller.get_fiscal_code)





module.exports = router;