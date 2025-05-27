// dependencies

const sampleHandler = require('./handlers/routeHandlers/sampleHandler');

const routes = {
  sample: sampleHandler.sampleHandle, 
};

module.exports = routes;
