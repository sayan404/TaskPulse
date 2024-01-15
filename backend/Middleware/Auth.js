const ErrorHandler = require("../Utils/ErrorHandler");
const CatchAsyncError = require("./CatchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel')
exports.isAuthenticUser = CatchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to Access resources", 401))
    }
    const decodeData = jwt.verify(token, process.env.ENCRIPTION_REF)
    req.user = await User.findById(decodeData.id)
    next();
})

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403)
            )
        }
        next()
    }
}