const express = require("express")
const router = express.Router()
const cookieParser = require("cookie-parser")
const url = require("url")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const auth = require("../controllers/authorizationController")
const signupController = require("../controllers/signupController")
const loginController = require("../controllers/loginController")

router.use(cookieParser())

setTokenAndCookie = async (user, res) => {
    const token = await user.generateAuthToken()

            var maxAge = 604800000 // one week in miliseconds
                res.cookie("access_token", token , {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "gelistirme",
                maxAge
            })
}

router.get("/", auth, async(req, res) => {
    // const cem = await userModel.findOne({"name":"cem"})
    // var storage = cem.uploadProfileImage(req)
    // console.log("storage ->"+storage)

    if(req.user) {
        //const user = await userModel.find({})
        //console.log("kullanıcılar "+user)

        var smallProfileImage = req.user._id+"/profileImage/small"
        var bigProfileImage = req.user._id+"/profileImage/big"

        return res.render("indexView", {
            pageTitle: "Anasayfa",
            profileImageSmall: req.user.profileImage ? smallProfileImage : "defaultpp",
            profileImageBig: req.user.profileImage ? bigProfileImage : "defaultProfileImageBig",
            user: req.user
        })
    }

    if(req.error) {
        console.log("auth hata ->"+ req.error)
    }

    return res.render("accessView", {
        pageTitle: "Giriş yap ya da kayıt ol",
    })
    
})

router.post("/", async (req, res) => {
    if(req.body.accessType == "sign-up"){
        const signError = await signupController(req.body)
        
        if(signError == false){
            const user = new userModel(req.body)
            await user.generateURL()
            await user.generateImagePath()
            
            const token = await user.generateAuthToken()

            var maxAge = 604800000 // one week in miliseconds
                res.cookie("access_token", token , {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "gelistirme",
                maxAge
            })

            //await cookieController(req)
            return res.redirect("/")
        }

        if(signError instanceof Error) {
            console.log("errro şu -> " + signError)
            if(signError.message == "Name must be entered") {
                return res.render("accessView", {
                    pageTitle: "Giriş yap ya da kayıt ol",
                    error: "isim girmeniz gerek"
                })
            }
            if(signError.message == "User validation failed: email: Email is invalid") {
                return res.render("accessView", {
                    pageTitle: "Giriş yap ya da kayıt ol",
                    error: "email geçersiz"
                })
            }
            if(signError.message == "Email exists") {
                return res.render("accessView", {
                    pageTitle: "Giriş yap ya da kayıt ol",
                    error: "email kullanılıyor"
                })
            }
            if(signError.message == "Passwords does not match") {
                return res.render("accessView", {
                    pageTitle: "Giriş yap ya da kayıt ol",
                    error: "şifreler aynı değil"
                })
            }
            if(signError.message === "Password is too short"){
                return res.render("accessView", {
                    pageTitle: "Giriş yap ya da kayıt ol",
                    error: "Şifre çok kısa"
                })
            }

        }
    }
   
    else if (req.body.accessType == "login") { 
        const user = await userModel.findOne({email: req.body.email})
        const logError = await loginController(req.body, user)
console.log("log error ->" + logError)
console.log("kullanıcı bakıldı")
        if(logError == false ){
console.log("hata yok")            
            const token = await user.generateAuthToken()

            var maxAge = 604800000 // one week in miliseconds
                res.cookie("access_token", token , {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "gelistirme",
                maxAge
            })

            return res.redirect("/")
        }

        if(logError instanceof Error) {
console.log("error şu ->" + logError)
            if(logError.message == "user not found" ){
                return res.render("accessView", {
                    pageTitle: "Giriş yap ya da kayıt ol",
                    error: "kullanıcı bulunamadı"
                })
            }
            if(logError.message == "password is wrong" ){
                return res.render("accessView", {
                    pageTitle: "Giriş yap ya da kayıt ol",
                    error: "şifre yanlış"
                })
            }
        }
    }
    

    // return res.render("accessView", {
    //     error: "Kayıt olurken bir "
    // })
})

module.exports = router
