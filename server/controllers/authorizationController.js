const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const userModel = require("../models/userModel")
var ObjectId = require('mongoose').Types.ObjectId
dotenv.config({ path: ".env" })

const authorizationController = async (req, res, next) => {
    try{
        //const token = JSON.stringify(req.cookies.access_token)
        //const decoded = jwt.verify()
        const token = req.cookies.access_token

        if(token) {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY)
            //const id = decoded._id.slice(1, -1)
            const id = decoded._id
            const user = await userModel.findOne({ _id: id, 'tokens.token': token })

            if (!user) {
                throw new Error("user or token does not match")
            }
            
            await user.generateImagePath()

            req.user = await user.toPage()
        }
        
    } catch (e) {
        req.error = e  
    }
    next()
}

module.exports = authorizationController