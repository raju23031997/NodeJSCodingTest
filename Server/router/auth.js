const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const bcrypt = require("bcryptjs")
require("../database/conn")
const usertable = require("../model/userSchema")
const Authenticate = require('../Middleware/authenticate')

// below code for registration route

router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, work, password, cpassword } = req.body // req.body is a object and in which we have name and all key so we can also destructured the object to get easily 

        const userExits = await usertable.findOne({ email: email })
        if (userExits) {
            return res.status(422).json({ error: "Email already Exist" })
        } else if (password != cpassword) {
            return res.status(422).send("Password are not matched")
        } else {
            const getUserDataForAPI = new usertable({ name, email, phone, work, password, cpassword })

            // after getting data from Userform we need to hash the password and then we need to save on database

            const adddatatoDB = await getUserDataForAPI.save() // .save() method is used to save data in database
            res.send(adddatatoDB)
            console.log(adddatatoDB);
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

// below code for login route

router.post("/signin", async (req, res) => {
    try {
        let JWToken;
        // const loginEmail = req.body.email
        // const loginPassword = req.body.password
        const { email, password } = req.body

        // if username and password feild is black so we need below operation
        if (!email || !password) {
            res.status(400).json({ error: "Please fill the details" })
        }

        // we have find user detailos using email from database 
        const loginCheck = await usertable.findOne({ email: email })


        if (loginCheck) {
            // we have compare the current password to database password through bcrypt.compare method
            const newPassword = await bcrypt.compare(password, loginCheck.password)

            // authentication token generate
            JWToken = await loginCheck.generateAuthToken()
            console.log(JWToken)

            // storing the token in our created cookie with expiry time 
            res.cookie("jwtCookie", JWToken, {
                expires: new Date(Date.now() + 6000000),
            })

            if (!newPassword) {
                res.status(400).json({ error: "Invalid Credential pass" })
            } else {
                res.status(200).json({ message: "User Login Done" })
            }
        } else {
            res.status(400).json({ error: "Invalid Credential email" })
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/About", Authenticate , (req, res)=>{
    console.log("Getting data")
        res.send(req.rootUser)
})

router.get("/getData", Authenticate, (req, res)=>{
    console.log("User at Home page")
    res.send(req.rootUser)
})

router.get("/getContact", Authenticate, (req, res)=>{
    console.log("User at Contact page")
    res.send(req.rootUser)
})

module.exports = router
