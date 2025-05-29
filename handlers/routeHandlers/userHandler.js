// dependencies
const data = require('../../lib/data');
const { hashedPassword } = require('../../helpers/utilities');
const { parseToJSON } = require('../../helpers/utilities');

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
    data.read('users', phone, (err) => {
      if (err) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hashedPassword(password),
          tosAgreement,
        };
        // store the user to db
        data.create('users', phone, userObject, (err) => {
          if (!err) {
            callback(200, {
              message: 'User was created successfully!',
            });
          } else {
            callback(500, { message: 'Could not create user!' });
          }
        });
      } else {
        callback(500, {
          message: 'User already exists!',
        });
      }
    });
  } else {
    callback(400, { message: 'You have a problem in your request' });
  }
};

handler._users.get = (reqProperties, callback) => {
  // check the phone number if valid
  const phone =
    typeof reqProperties.queryStrObj.phone === 'string' &&
    reqProperties.queryStrObj.phone.trim().length === 11
      ? reqProperties.queryStrObj.phone
      : false;

  if (phone) {
    // lookup the user
    data.read('users', phone, (err, userData) => {
      const user = { ...parseToJSON(userData) };
      if (!err && userData) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          message: 'Requested user was not found!',
        });
      }
    });
  } else {
    callback(404, {
      message: 'Requested user was not found!',
    });
  }
};

handler._users.put = (reqProperties, callback) => {
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

  if (phone) {
    if (firstName || lastName || password) {
      // lookup the user
      data.read('users', phone, (err, userData) => {
        user = {...parseToJSON(userData)};

        if (!err && user) {
          if (firstName) {
            user.firstName = firstName;
          }
          if (lastName) {
            user.lastName = lastName;
          }
          if (password) {
            user.password = hashedPassword(password);
          }

          // store to the database
          data.update('users', phone, user, (err) => {
            if (!err) {
              callback(200, {
                message: 'User was updated successfully!',
              });
            } else {
              callback(500, {
                message: 'There was a problem in server!!',
              });
            }
          });
        } else {
          callback(400, {
            message: 'You have a problem in your request!',
          });
        }
      });
    } else {
      callback(400, {
        message: 'You have a problem in your request!',
      });
    }
  } else {
    callback(400, {
      message: 'Invalid phone number. Please try again',
    });
  }
};

handler._users.delete = (reqProperties, callback) => {};

module.exports = handler;
