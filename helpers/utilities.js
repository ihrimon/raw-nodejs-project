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

// create random string
utilities.createRandomString = (strlength) => {
  let length = strlength;
  length = typeof strlength === 'number' && strlength > 0 ? strlength : false;

  if (length) {
      const possiblecharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
      let output = '';
      for (let i = 1; i <= length; i += 1) {
          const randomCharacter = possiblecharacters.charAt(
              Math.floor(Math.random() * possiblecharacters.length)
          );
          output += randomCharacter;
      }
      return output;
  }
  return false;
};

// export module
module.exports = utilities;
