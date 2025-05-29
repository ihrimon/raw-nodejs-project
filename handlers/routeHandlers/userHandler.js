// dependencies
const data = require('../../lib/data');
const { hashedPassword } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');

const handler = {};

handler.userHandler = (reqProperties, callback) => {
  const acceptedMethod = ['get', 'post', 'put', 'delete'];

  if (acceptedMethod.indexOf(reqProperties.method) > -1) {
    handler._users[reqProperties.method](reqProperties, callback);
  } else {
    callback(405, {
      message: 'Method not allowed!',
    });
  }
};

handler._users = {};

handler._users.post = (reqProperties, callback) => {
  const firstName =
    typeof reqProperties.body.firstName === 'string' &&
    reqProperties.body.firstName.trim().length > 0
      ? reqProperties.body.firstName
      : false;

  const lastName =
    typeof reqProperties.body.lastName === 'string' &&
    reqProperties.body.lastName.trim().length > 0
      ? reqProperties.body.lastName
      : false;

  const phone =
    typeof reqProperties.body.phone === 'string' &&
    reqProperties.body.phone.trim().length === 11
      ? reqProperties.body.phone
      : false;

  const password =
    typeof reqProperties.body.password === 'string' &&
    reqProperties.body.password.trim().length > 6
      ? reqProperties.body.password
      : false;

  const tosAgreement =
    typeof reqProperties.body.tosAgreement === 'boolean' &&
    reqProperties.body.tosAgreement
      ? reqProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that the user doesn't already exists
    data.read('users', phone, (err1) => {
      if (err1) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hashedPassword(password),
          tosAgreement,
        };
        // store the user to db
        data.create('users', phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              message: 'User was created successfully!',
            });
          } else {
            callback(500, { error: 'Could not create user!' });
          }
        });
      } else {
        callback(500, {
          error: 'There was a problem in server side!',
        });
      }
    });
  } else {
    callback(400, { message: 'You have a problem in your request' });
  }
};

handler._users.get = (reqProperties, callback) => {
  callback(200, {
    message: 'Success get method',
  });
};

handler._users.put = (reqProperties, callback) => {};

handler._users.delete = (reqProperties, callback) => {};

module.exports = handler;
