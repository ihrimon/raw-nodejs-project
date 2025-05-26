// Uptime Monitoring Application

const http = require('http');

// module scafolding
const app = {};

// configuaration
app.config = {
    port: 3000,
}

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to port at ${app.config.port}`)
    });
}

// handle request response
app.handleReqRes = (req, res) => {
    res.end('Hello world');
}

// start the server
app.createServer();