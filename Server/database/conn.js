const mongoose = require("mongoose")

// DATABASE Connection
mongoose.connect("mongodb://localhost:27017/alluserdata")
.then(()=>{
    console.log("Database Connection done......")
}).catch((err)=>{
    console.log(err)
})