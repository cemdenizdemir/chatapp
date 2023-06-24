const express = require("express")
const http = require("http")
const path = require("path")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const socketio = require("socket.io")
const cookie = require("cookie")
const jwt = require("jsonwebtoken")
require("./server/db/mongoose")

dotenv.config({ path: ".env" })

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.set("views", "./server/views")
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())

const port = process.env.PORT || 5000

const accessRouter = require("./server/routes/accessRouter")
//const indexRouter = require("./server/routes/indexRouter")

const socketioController = require("./server/controllers/socketioController")

//const publicDirectoryPath = path.join(__dirname, "./public")
const cssPath = path.join(__dirname, "./public/css")
const imgPath = path.join(__dirname, "./public/img")
const jsPath = path.join(__dirname, "./public/js")

app.use(accessRouter)
//app.use(indexRouter)

//app.use( express.static(publicDirectoryPath) )
app.use("/css", express.static(cssPath))
app.use("/img", express.static(imgPath))
app.use("/js", express.static(jsPath))

io.on("connection", (socket) => {

    var cookies = cookie.parse(socket.handshake.headers.cookie);
    access_token = cookies.access_token
    const decodedUser = jwt.verify(access_token, process.env.TOKEN_KEY)
    socketioController.serverConnection()

    socket.on("join", async () => {
        socketioController.roomConnection()
    })

    socket.on("searchUser", async (searchInput) => {
        const users = await socketioController.searchUser(searchInput, decodedUser)
        socket.emit("searchUserResults", users)
    })

    socket.on("sendFriendRequest", async (friendURL) => {
        const users = await socketioController.sendFriendRequest(friendURL, access_token)
        //console.log("eklenecen ve ekleyen kullancılar ->"+users)
    })

    socket.on("editProfileSettings", async (command) => {
        await socketioController.editProfileSettings(decodedUser ,command)
        socket.emit()
    })

    socket.on("checkProfileImage", async () => {
        const result = await socketioController.checkProfileImage(decodedUser._id)
        socket.emit("checkProfileImageResult", result)
    })
})


server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})
