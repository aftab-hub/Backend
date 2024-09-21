const express = require("express")
exports.success = (message,result,statusCode,count)=>{
    return{
        message,
        error : false,
        code : statusCode,
        count : result.length,
        result,
        
    }
};

exports.error = (message,statusCode)=>{
    return{
    message, 
    code : statusCode,
    error : true,

    }

}

// module.exports = {
//     success,
//     error
// }