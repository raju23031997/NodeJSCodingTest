//1- how to connect with database
const express = require("express")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/alluserdata1")
.then(()=>{
    console.log("Connection done.....")
}).catch(err => console.log(err))

// 2- create CRUD operation using express with mongo db in app file 
const express = require("express")
const port = 5000
const app = express()
app.use(express.json())

app.post("/regster", async (req, res)=>{
    try {
        
        res.status(200).send("Data added in DB")
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, ()=>{
    console.log(`Server runnihg in port no. ${port}`)
})