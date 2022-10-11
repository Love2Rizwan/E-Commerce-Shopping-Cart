const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


router.get('/test-me', function (req, res) {
    return res.status(200).send({status:true, message:"My fist Api "})
})

// =================================== Create User ============================
router.post("/register", userController.createUser)



router.all("/**", function (req, res) {
    return res.status(400).send({status:false , message: "Invalid request"})
})
module.exports = router;