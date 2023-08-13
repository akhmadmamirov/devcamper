const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err}

    error.message = err.message

    //Log to the console for the dev
    console.log(err)

    //Mongoos bad objectID
    if (err.name === 'CastError'){
        const message = "Resource not found";
        error = new ErrorResponse(message, 404)
    }

    //Mongoose duplicate key
    if (err.code === 1100){
        const message = 'Duplicate field entered'
        error = new ErrorResponse(message, 400)
    }

    //Mongoose validation
    if (err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server Error'})
}

module.exports = errorHandler;