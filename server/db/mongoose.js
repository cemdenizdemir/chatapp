const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/cem-chat-app", {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false
})