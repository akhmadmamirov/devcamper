const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { parse } = require('dotenv')

//Protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer'))
    //Set token from the Bearer Token in the header
    {
        token = req.headers.authorization.split(' ')[1]
    }
    //Set token from cookie
    else if (req.cookies.token){
        token = req.cookies.token
    }

    //Make sure token exists
    if (!token){
        return next(new ErrorResponse('Not authorized to acces this route', 401)) 
    }

    try{
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = await User.findById(decoded.id)
        next()
    }catch(err){
        return next(new ErrorResponse('Not authorized to acces this route', 401)) 
    }
})

//Grant acces to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return next(
                new ErrorResponse(`User role ${req.user.role} is not authorized to acces this route`, 403))
        }
        next()
    }
}



