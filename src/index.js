const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
// Import router
const routes = require('./routes/route.js');
const app = express();   // Create an ExpressJS app


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().any());



mongoose.connect("mongodb+srv://bittushri8224:lyNrXnwy17jk4lFa@cluster0.ii3dqef.mongodb.net/group53Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is Connected."))
    .catch(error => console.log(error))


app.use('/', routes) //to use the routes
// app.use( route)



// Start the server on port 3000
app.listen(3000, function () {
    console.log('Express App Running on Port: ' + (3000))
});

