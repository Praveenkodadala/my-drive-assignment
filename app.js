const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
console.log("process.env.PORT", process.env.PORT)
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
var morgan = require('morgan')


//imports
require("dotenv").config();
const routes = require("./server/routes/routes");


//connect to db
mongoose.connect(process.env.MONGODB_URI1, { dbName: "myDrive" }, {useNewUrlParser: true , useUnifiedTopology: true});  
const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error:"));
db.once("open", function () {
  console.log("connected to mongodb");
});



//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static(path.join(__dirname, "./client/dist/client")));




app.use("/api", routes);






app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
