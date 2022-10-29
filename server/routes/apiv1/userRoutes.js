const express = require('express');
const router = express.Router();
const user_controller = require('../../controllers/apiv1/userController');
const token_handler = require("../../middlewares/authMiddleware")


router.post("/user_register", user_controller.user_register)
router.post("/user_login", user_controller.user_login)

router.post("/forget_password",  user_controller.forget_password)
router.post("/change_password_by_otp",  user_controller.change_password_by_otp)

//user-profile component
router.get("/get_user_profile", token_handler.userTokenCheck, user_controller.get_user_profile)

//user-profile component
router.post("/update_user_profile",token_handler.userTokenCheck, user_controller.update_user_profile)
router.post("/update_user_password",token_handler.userTokenCheck, user_controller.update_user_password)



router.get('/get_user_profile', token_handler.userTokenCheck, user_controller.get_user_profile);
router.get('/get_user_module_permissions', token_handler.userTokenCheck, user_controller.get_user_module_permissions);



router.post("/create_sadmin", user_controller.createSadmin)
router.post("/createSadmin_userRole", user_controller.createSadmin_userRole)
router.post("/createCasbinAccessModules", user_controller.createCasbinAccessModules)



module.exports = router;
