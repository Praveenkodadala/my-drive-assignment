const express = require("express")
const app = express()

const user_routes = require("../routes/apiv1/userRoutes")
const mydrive_routes = require("../routes/apiv1/mydrive_routes")



app.use('/apiv1/user', user_routes)
app.use("/apiv1/mydrive", mydrive_routes )

module.exports = app;