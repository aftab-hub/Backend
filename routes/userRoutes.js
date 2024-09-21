const controllers = require("../controllers/controllers")
const auth = require("../middleware/athorization")

const express = require("express")
const router = express.Router()

router.post("/create", controllers.createUser)
router.get("/getUsers",auth.checkAuth, controllers.getUsers)
router.get("/findUser/:id", controllers.findUser)
router.delete("/delete/:id", controllers.deleteUser)
router.put("/update/:id", controllers.updateUser)
router.post("/login", controllers.login)

module.exports = router