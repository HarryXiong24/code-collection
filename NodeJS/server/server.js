const http = require('http');

function start(route, handle) {
  const port = '8080';

  const server = http.createServer((req, res) => {
    const pathname = req.url;
    console.log('Request for ' + pathname + ' received.');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const content = route(handle, pathname);
    res.write(content);
    res.end();
  });

  server.listen(port, () => {
    console.log(`Server has started.`);
  });
}

module.exports = {
  start,
};
