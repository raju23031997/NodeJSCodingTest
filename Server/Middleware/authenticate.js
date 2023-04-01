
const jwt = require("jsonwebtoken")
const usertable = require("../model/userSchema")

const Authenticate = async (req, res, next)=>{
    try {
        const getTokenFromCookie = req.cookies.jwtCookie // getting token from cookie which is prseent in req.body 
        console.log(getTokenFromCookie)
        if(!getTokenFromCookie){
            // throw new Error("User Not Found")
           return res.status(500).json({})
        } else{
            const verifyiedToken = jwt.verify(getTokenFromCookie, process.env.SECRET_KEY) // compare current Token to Database Token

        // Find userData by sing token
        const rootUser = await usertable.findOne({_id:verifyiedToken._id, "Tokens.Token":getTokenFromCookie}) 
        req.getTokenFromCookie = getTokenFromCookie
        req.rootUser = rootUser
        req.userID = rootUser._id
        next()
        }
        
        // if(!rootUser){
        //    throw new Error("User Not Found")
        // }
        
    } catch (error) {
        res.status(401).send(error)
        console.log(error);
    }
}

module.exports = Authenticate