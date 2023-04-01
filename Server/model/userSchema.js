const dotenv = require("dotenv") // dotenv we have install because we need to use config file
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

dotenv.config({path:'./config.env'})

// Create Schema of the collection 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    Tokens:[
        {
            Token:{
                type: String,
                required: true
            }
        }
    ]

})

// hashing the password before creating the collection 
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let TokenGen = jwt.sign({ _id: this._id }, process.env.SECRET_KEY) // generate the token 
        this.Tokens = this.Tokens.concat({Token:TokenGen}) // add the generated token into our schema module using concat method
        await this.save()
        return TokenGen
    } catch (error) {
        console.log(error)  
    }
}

// Create Collection(userTable) of our DB with Schema(userSchema)
const usertable = mongoose.model("usertable", userSchema)

module.exports = usertable