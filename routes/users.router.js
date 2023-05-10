const express = require("express")
const router = express.Router()

const usersController = require("../controller/users.controller")

router.get("/", usersController.getAll)
router.get("/:id", usersController.getById)
router.post("/", usersController.create)
router.put("/:id", usersController.update)
router.put("/:id", usersController.updateadmin)
router.put("/password/:id", usersController.updatePassword)
router.delete("/:id", usersController.delete)




module.exports = router

 
