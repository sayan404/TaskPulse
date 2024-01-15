// Creating Token and Generating Cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken()
    const options = {
        curentDate : new Date(),
        expires: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    // storing data in cookie and parsing as json 
    
    res.status(statusCode).cookie("token", token, options).json({     
        success: true,
        user,
        token
    })
}

module.exports = sendToken