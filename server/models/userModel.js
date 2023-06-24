const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const sharp = require("sharp")

const fs = require("fs")
const imgDir = "./public/img/"

const dotenv = require("dotenv")
dotenv.config({ path: ".env" })


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    url: {
        type: String,
        
    },
    profileImage: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    chatRooms: [{
        room: {
            type: String
        }
    }],
    socketRooms: [{
        room: {
            type: String
        }
    }],
    friends: [{
        friend: {
            type: String
        }
    }],
    friendRequests: [{
        request: {
            type: String
        }
    }],
    blockedUsers: [{
        user: {
            type: String
        }
    }]
})

userSchema.methods.generateImagePath = async function () {
    const user = this
    if(!fs.existsSync(imgDir+user._id)){
        fs.mkdirSync(imgDir+user._id)
        fs.mkdirSync(imgDir+user._id+"/profileImage")
    }
}

userSchema.methods.uploadProfileImage = function (req) {
    // if(!fs.existsSync(imgDir+user._id+"/profileImage/big.png")){
    //     console.log("resim yok")
    // }
    // else {
        
    const storage = multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, imgDir+user._id+"/profileImage/")
        },
        filename: function (req, file, cb) {
            cb(null, "big.png")
        }
    })
    return storage
    //}
}

userSchema.methods.removeProfileImage = async function () {
    console.log("profil resmi kaldırıldı")
    const user = this
    // fs.unlink(imgDir + user._id + "/profileImage/big.png", err => {
    //     if(err) { return console.log("profil resmi kaldırılamadı")}
    //     console.log("profil resmi kaldırıldı")
    // })

    fs.unlink(imgDir + user._id + "/profileImage/big.png", (err) => {
        if(err) {
            console.log("profile resmi kaldırılamadı, big.png")
        }
    })
    fs.unlink(imgDir + user._id + "/profileImage/small.png", (err) => {
        if(err) {
            console.log("profile resmi kaldırılamadı, small.png")
        }
    })
    user.profileImage = false
    await user.save()
}

        // const storage = multer.diskStorage({
        //     destination: function (req, file, cb) {
        //     cb(null, '/tmp/my-uploads')
        //     },
        //     filename: function (req, file, cb) {
        //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //     cb(null, file.fieldname + '-' + uniqueSuffix)
        //     }
        // })
        
        // const upload = multer({ storage: storage })

userSchema.methods.toPage = async function () {
    const user = this
    const userObject = user.toObject()

    
    delete userObject.password
    delete userObject.tokens
    delete userObject.chatRooms
    delete userObject.socketRooms
    delete userObject.friendRequests
    delete userObject.__v
    
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    //token = jwt.sign({_id: JSON.stringify(user._id)}, process.env.TOKEN_KEY)
    token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.receiveFriendRequest = async function (senderID) {
    const user = this
    var id = user.friendRequests.find((object) => {
        if(object.request == senderID) { return senderID}
    })
    
    if(!id){
        user.friendRequests = user.friendRequests.concat({request: senderID})
        id = senderID

        console.log("istek -> "+ id+"  "+senderID)
        console.log("eklenecek kişi id ->"+id)
    }
    else { console.log("istek zaten yollanmış")}
   
    await user.save()
}

userSchema.methods.generateURL = async function (url) {
    const user = this
    var name = user.name.trim().toLowerCase().split(" ").join("")
    var num, newURL = name
    var allUsersUseSameName = await userModel.find({ name: user.name })

    if (!url) { url = name }

    var ifURLExists = await userModel.findOne({ url })
    while (ifURLExists) {
        num = Math.floor(Math.random() * 100) + allUsersUseSameName.length
        newURL = name + num
        ifURLExists = await userModel.findOne({ url: newURL })
    }

    user.url = newURL
    await user.save()
}

userSchema.pre("save", async function (next) {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel