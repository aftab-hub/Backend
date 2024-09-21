const User = require("../models/schema")

const jwt = require("jsonwebtoken")
require("dotenv").config()

const checkAuth = (req,res,next)=>{
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token,process.env.secret_key)
    next()
  } catch (err) {
    return res.status(403).json({
      message : "kindly login first"
    })
  }
}

const checkAdmin = async(req,res,next)=>{
 try {
  const token = req.headers.authorization.split(" ")[1]
  const checkToken = jwt.verify(token,process.env.secret_key)
  const user = await User.findOne({
    email : checkToken?.user?.email
  })
  if (checkToken?.user?.role === "admin") {
      next()
  }else{
    return res.status(403).json({
      message : "You are not allowed to access this route"
    })
  }
 } catch (err) {
    return res.status(401).json({
      message : "Not authorized"
    })
 } 
}

module.exports = {
  checkAuth,
  checkAdmin
}