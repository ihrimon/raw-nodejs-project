
const handler = {};

handler.sampleHandle = (reqProperties, callback) => {
  callback(200, {
    message: 'This is sample url',
  });
};

module.exports = handler;
