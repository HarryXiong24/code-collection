const http = require('http');

function start() {
  const port = '8080';

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World');
    res.end();
  });

  server.listen(port, () => {
    console.log(`Server has started.`);
  });
}

module.exports = {
  start,
};
