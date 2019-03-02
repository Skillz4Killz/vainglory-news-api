const http = require('http');
const port = process.env.PORT || 3000;
const app = require('./app');

const server = http.createServer(app);

server.listen(port, () =>
  console.log(`Vainglory News API Server has started on ${port}.`)
);
