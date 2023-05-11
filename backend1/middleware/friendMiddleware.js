const jwt = require('jsonwebtoken');

module.exports.friendMiddleware = async(req,res,next) => {
     console.log(req.body);
     next();
}