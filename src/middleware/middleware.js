const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const userModel = require('../models/userModel.js')


//--------------------------|| AUTHENTICATION ||--------------------------------

const authentication = async function (req, res, next) {
    try {
        token = req.headers['x-api-key']

        if (!token) { 
            return res.status(400).send({ status: false, message: "Token is Required" }) 
        }

        decodedToken = jwt.verify(token, "Products Management", (err, decode) => {
            if (err) {
                return res.status(400).send({ status: false, message: "Token is not correct!" })
            }
            req.decode = decode

            next()
        })

    } catch (error) {
      console.log(error)
        res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------|| AUTHORIZATION ||--------------------------------


const authorization = async function (req, res, next) {
    try {
      const token = req.headers["x-api-key"]; // we call headers with name x-api-key

      if (!token){
        res.status(401).send({ status: false, msg: "missing a mandatory token" })
      };

      let decodedToken = jwt.verify(token, "Products Management");
      let userLoggedIn = decodedToken.userId;
      let userId = req.params.userId
      
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).send({ status: false, msg: 'Please enter valid userId Id' })
      }
      let userData = await userModel.findById(userId)
      let user = userData._id.toString();
      
      if (userLoggedIn != user) {
        return res.status(403).send({ status: false, msg: "You are not authrized" });
      }
      next();
    } catch (error) {
      console.log(error)
      res.status(500).send({ status: false, Error: error.message });
    }
  };

  // DeStructuring
module.exports = { authentication, authorization }
