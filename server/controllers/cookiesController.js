const express = require("express")

const cookieController = async (req, res) => {
    var expires = new Date(Date.now() + 5 * 100000)
             
            res.cookie("access_token", "cem", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "gelistirme",
                expires
            })

}

module.exports = cookieController