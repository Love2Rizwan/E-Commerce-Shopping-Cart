const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const productController = require("../controllers/productController")
const cartController = require("../controllers/cartController")
const orderController = require("../controllers/orderController")
const MW = require("../middleware/middleware.js")


// =================================== Create User ============================
router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/user/:userId/profile", MW.authentication, userController.getUsers)
router.put("/user/:userId/profile", MW.authentication, MW.authorization, userController.updateUser)

// =================================== product User ============================
// handle post request for path /products
router.post("/products", productController.createProduct)
// handle get request for path /products
router.get("/products", productController.getProductByQuery)
// handle get request for path /products/:productId
router.get("/products/:productId", productController.getProductById)
// handle put request for path /products/:productId
router.put("/products/:productId", productController.updateProductById)
// handle delete request for path /products/:productId
router.delete("/products/:productId", productController.Deleteproduct)

// =================================== cart User ============================

router.post("/users/:userId/cart", MW.authentication, MW.authorization, cartController.createCart)
router.put("/users/:userId/cart", MW.authentication, MW.authorization, cartController.updatecart)
router.get("/users/:userId/cart", MW.authentication, MW.authorization, cartController.getcart)
router.delete("/users/:userId/cart", MW.authentication, MW.authorization, cartController.deletecart)


// =================================== order User ============================

router.post("/users/:userId/orders", MW.authentication, MW.authorization, orderController.createorder)
router.put("/users/:userId/orders", MW.authentication, MW.authorization, orderController.updateOrder)


// ============================  Checking all request validation ========================

router.all("/**", function (req, res) {
    return res.status(400).send({ status: false, message: "Invalid request" })
})


module.exports = router; 
