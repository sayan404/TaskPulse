const express = require('express')
const { isAuthenticUser } = require('../Middleware/Auth')
const { loginUser, logout, getUserDetails, registerUser } = require('../Controlers/UserControler')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticUser, getUserDetails)

module.exports = router