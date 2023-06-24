const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const fs = require("fs")
const imgDir = "./public/img/"

const dotenv = require("dotenv")
const { profile } = require("console")
dotenv.config({ path: ".env" })

const serverConnection = async () => { console.log("sunucuya yeni bağlantı") }

const roomConnection = async () => { console.log("odaya bağlantı sağlandı") }

const searchUser = async (searchInput, user) => {
    console.log("aranan kişi: "+searchInput, "\naramayı yapan kullanıcı: "+JSON.stringify(user))
    
    var usersFound = await userModel.find({ $or: [{ name: searchInput }, { url: searchInput }] })
    const filteredUsers = usersFound.filter( eachUser => {return eachUser._id != user._id})

    return filteredUsers
}

const sendFriendRequest = async (friendURL, access_token) => {  
    const decoded = jwt.verify(access_token, process.env.TOKEN_KEY)
    const id = decoded._id
    const user = await userModel.findOne({ _id: id, 'tokens.token': access_token })
    const friend = await userModel.findOne({ url: friendURL })

    if (user && friend) {
        await friend.receiveFriendRequest(user.id.toString())
    }
}

const editProfileSettings = async (user, command) => {
    const foundUser = await userModel.findOne( {_id: user._id} )
    foundUser.removeProfileImage()
}

const checkProfileImage = async (userid) => {
    const user = await userModel.findOne({ _id: userid })
    if( user.profileImage ){
        return true
    }
    return false
}

const socketioController = {
    serverConnection,
    roomConnection,
    searchUser,
    sendFriendRequest,
    editProfileSettings,
    checkProfileImage
}

module.exports = socketioController