const crypto = require('crypto');
const environments = require('./environments');

const utilities = {};

// pase JSON string to object
utilities.parseToJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
  }

  return output;
};

// hash string for password
utilities.hashedPassword = (passwordString) => {
  if (typeof passwordString === 'string' && passwordString.length > 0) {
    const hash = crypto
      .createHmac('sha256', environments.secretKey)
      .update(passwordString)
      .digest('hex');
    return hash;
  }
  return false;
};

// export module
module.exports = utilities;
