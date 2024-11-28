const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/schema")
const controllers = require("./controllers/controllers")
const routes = require("./routes/userRoutes")
// const twilio = require("./helper/twilio")
const cors = require("cors")
const bodyParser = require("body-parser")       
const cron = require("node-cron")
require("dotenv").config()

const app = express()

app.use(express.json({extended : true, limit : "5mb"}))
app.use(bodyParser.json({extended : true, limit : "5mb"}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
mongoose.connect(process.env.db_url)
.then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`Server is up and running on port ${process.env.port}`);
        console.log(`Connected to Database`)
        
    })
})
.catch((err)=>{
    console.log(err)
})

app.use("/user",routes)
app.use("/",(req,res,next)=>{
    res.send(`Welcome to the server`)
})



