const User = require("../models/schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/athorization")
const {success,error} = require("../helper/BaseResponse")
const sendEmail = require("../helper/SendEmail")

require("dotenv").config()

const createUser = async(req,res,next)=>{
    const user = req.body
    const newUser = new User(user)

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password,salt)
        newUser.password = hashPassword

        await newUser.save()
        sendEmail(newUser.email)
        return res.status(201).json(success("user created successfully!",newUser,201))
    } catch (err) {
        return res.status(500).json(error(err.message,500))
    }
}

const getUsers = async(req,res,next)=>{
   try {
    const user = await User.find({})
    return res.status(200).json(success("user fetched",user,200))
   } catch (err) {
      return res.status(500).json({
        message : err.message
      })
   }
}
const deleteUser = async(req,res,next)=>{
    const id = req.params.id
    const deletedValues = req.body
    try {
        const user = await User.findOne({
            _id : id
        })
        if (!user) {
            return res.status(404).json(error("user not found!",404))
        }
        await User.findByIdAndDelete(id, deletedValues)
        return res.status(200).json(success("user deleted successfully!",deletedValues,200))
    } catch (err) {
        return res.status(500).json(error(err.message,500))
    }
}
const updateUser = async(req,res,next)=>{
    const id = req.params.id
    const updatedValues = req.body
    try {
        const user = await User.findOne({
            _id : id
        })
        if(!user){
            return res.status(404).json({
                message : "user not found"
            })
        }
        await User.findByIdAndUpdate(id,updatedValues)
        return res.status(200).json({
            message : "user updated",
            result : updatedValues
        })
    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
}
const findUser = async(req,res,next)=>{
    const id = req.params.id
   
    try {
        const user = await User.findOne({
            _id : id
        })
        if(!user){
           return res.status(404).json({
            message : "user not found"
           }) 
        }
        await User.findById(id)
        return res.status(200).json({
            message : "user fetched",
            result : user
        })
    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
}
const login = async(req,res,next)=>{
    const {email, password} = req.body
   try {
    const user = await User.findOne({
        email : email
    })
    if (!user) {
        return res.status(404).json({
            message : "Email does not exit"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message : "Invalid password"
        })
    }
    const payload = {user}
    const token = jwt.sign(payload,process.env.secret_key)
    
    return res.status(200).json({
        message : "login successfully",
        token : token
    })
   } catch (err) {
        return res.status(500).json({
            message : err.message
        })
   }
}
 

module.exports = {
    createUser,
    getUsers,
    findUser,
    deleteUser,
    updateUser,
    login
}