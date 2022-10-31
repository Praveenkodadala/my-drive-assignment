
const express = require("express");
const port = process.env.PORT || 3000;
const createError = require("http-errors");
const path = require("path");
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var morgan = require('morgan')
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const routes = require("./server/routes/routes");
require("dotenv").config();
const fs = require("fs");



//view engine setup
app.set("views", path.join(__dirname, "server/views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));


//  console.log("__dirname",  __dirname);
global.paths = {
  UPLOAD: __dirname + "/uploads/",
};
// console.log("global.paths", global.paths)



//connect to db
mongoose.connect(process.env.MONGODB_URI1, { dbName: "myDrive" }, {useNewUrlParser: true , useUnifiedTopology: true});  
const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error:"));
db.once("open", function () {
  console.log("connected to mongodb");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.options("*", cors());


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "./client/dist/client")));
app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads/")));
app.get("/", function (req, res) {
  res.send("Server is working fine.");
});

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/client/index.html")
  );
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // console.log('env', req.app.get('env'));
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});




app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
