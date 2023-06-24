const express = require("express")
const jwt = require("jsonwebtoken")

const userModel = require("../models/userModel")

const dotenv = require("dotenv")
dotenv.config({ path: "../../../.env" })

const signupController = async (body) => {
    try {
        if (body.name == "") {
            throw new Error("Name must be entered")
        }
        if (body.password != body.password_again) {
            throw new Error("Passwords does not match")
        }
        if (body.password.length < 7) {
            throw new Error("Password is too short")
        }

        const doesEmailExists = await userModel.exists({ email: body.email })
        if (doesEmailExists) {
            throw new Error("Email exists")
        }

        return false
    } catch (e) {
        console.log("SIGNUP CONTROLLER HATA")
        return e
    }

}

module.exports = signupController