// Handle Request Response

// Dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler')

// module scafolding
const handler = {};

handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method;
  const queryStrObj = parsedUrl.query;
  const headerObj = req.headers;

  const reqProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStrObj,
    headerObj,
  }

  const decoder = new StringDecoder('utf-8');
  let realData = '';

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

    chosenHandler(reqProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      // return the final response
      res.writeHead(statusCode);
      res.end(payloadString);
    });

  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  })

req.on('end', () => {
    realData += decoder.end();
    console.log(realData);
    // response handle
    res.end('Uptime Monitoring Application');
})

};

module.exports = handler;