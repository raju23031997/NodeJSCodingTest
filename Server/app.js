const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const port = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(cookieParser())
require("./database/conn") // import database in app.js file
const usertable = require("./model/userSchema") // imported collection(usertable) in app.js file

app.use(express.json()) // if any json data recieved so convet in object and show it
app.use(require("./router/auth"))


app.listen(port, ()=>{
    console.log("Server is running on port No. 5000.....")
})