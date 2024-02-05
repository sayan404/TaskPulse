const nameRegex = /^[a-zA-Z-' ]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function validName(name) {
  return nameRegex.test(name);
}
function validateEmail(email) {
  return emailRegex.test(email);
}

function validatePassword(password) {
  return passwordRegex.test(password);
}

module.exports = {
  validName,
  validateEmail,
  validatePassword,
};
