const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        allowNull : false
    },
    email : {
        type : String,
        required : [true, "Email is Mandatory"],
        allowNull : false,
        unique : true 
    },
    password : {
        type : String,
        required : [true, "Password is Mandatory"],
        allowNull : false,
        unique : true 
    },
    number : {
        type : String,
        required : true,
        allowNull : false
    }

})

const User = mongoose.model("User",userSchema)

module.exports = User