const cron = require("node-cron")
require("dotenv").config()

const accountSid = process.env.Account_SID ;
const authToken = process.env.Auth_Token;

const client = require('twilio')(accountSid, authToken);


cron.schedule("*/5* * * * *",()=>{
    client.messages
      .create({
        body: 'Hello from twilio-node',
        to: '+919794078055', // Text your number
        from: '+12512202297', // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
})