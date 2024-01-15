const express = require('express');
const cors = require('cors'); // Import the 'cors' package
const ErrorHandler = require('./Utils/ErrorHandler')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors());


// Route imports 
const user = require('./Routes/UserRoute')

// api route imports
app.use('/api/v1', user)

// Error Handling of all wrong routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Cannot find ${req.originalUrl} on this server`, 404))
})


module.exports = app 