const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_LINK, {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(express.static(__dirname + "/client"))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/client/index.html")
})

app.listen(8000, ()=> console.log("server running on: 8000"))