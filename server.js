const express = require("express")
const dotenv = require("dotenv")
const logger = require('./middleware/logger')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors');
const errorHandler = require('./middleware/error')

//Route Files
const bootcamps = require('./routes/bootcamps')
//Load env vars
dotenv.config({path : './config/config.env'})

//Connect to the DB
connectDB();

const app = express();

//Body Parser
app.use(express.json())


//Dev Logging middleware
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandler)

const PORT = process.env.PORT || 5000



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

 