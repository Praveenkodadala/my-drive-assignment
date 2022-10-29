const express = require("express")
const app = express()

const user_routes = require("../routes/apiv1/userRoutes")




app.use('/apiv1/user', user_routes)


module.exports = app;