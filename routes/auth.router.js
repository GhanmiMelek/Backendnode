const express = require("express")
const router = express.Router()

const authController = require("../controller/auth.controller")

router.post("/register", authController.register)
router.post("/registerAdmin", authController.registerAdmin)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.post("/verifyemail", authController.verifyemail)


module.exports = router

 
