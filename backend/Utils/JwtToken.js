// Creating Token and Generating Cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const refreshToken = user.getRefreshToken();

  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };

  // storing data in cookie and parsing as json

  res
    .status(statusCode)
    .cookie("token", token, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendToken;
