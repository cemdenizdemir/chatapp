const bcrypt = require("bcryptjs")

const loginController = async (body, user) => {
    try {
        if(!user){
            throw new Error ("user not found")
        }

        console.log("karşılaştılacak şifreler -> " +body.password+" --- "+ user.password)
        var compareResult = await compare(body.password, user.password)
        
        console.log("karşılaştırma sonucu -> "+compareResult)  
        if(!compareResult) { throw new Error ("password is wrong") }

        return false

    } catch(e){
        console.log("LOGIN CONTROLLER HATA")
        return e
    }
}

compare = async (userPassword, hashedPassword) => {
    return bcrypt.compare(userPassword, hashedPassword)
}

module.exports = loginController