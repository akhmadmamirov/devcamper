const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const logger = require('./middleware/logger')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors');
const errorHandler = require('./middleware/error')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


//Route Files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth  = require('./routes/auth')
const users  = require('./routes/users')
const reviews  = require('./routes/reviews')

//Load env vars
dotenv.config({path : './config/config.env'})

//Connect to the DB
connectDB();

const app = express();

//Body Parser
app.use(express.json())

//Cookie Parser
app.use(cookieParser())

//Dev Logging middleware
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//File Uploader
app.use(fileUpload())

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

app.use(errorHandler)

const PORT = process.env.PORT || 5000



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

 