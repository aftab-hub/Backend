const nodemailer = require("nodemailer")
require("dotenv").config()

const sendEmail = (email)=>{
    const transpoter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.email_user,
            pass : process.env.email_pass
        }
    })
    const mailingDetails = {
        from : process.env.email_user,
        to : "aajan7650@gmail.com",
        subject : "testing for new email",
        message : "new message from nodemailer",
        html :  `<h1>hello world</h1>`
    }
    transpoter.sendMail(mailingDetails,function (err,data) {
        if (err) {
            console.log("err");
        }else {
          console.log("mail sent");
          
        }
    })
}
module.exports = sendEmail

