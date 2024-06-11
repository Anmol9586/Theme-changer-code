const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

// Serve up the build folder
const serve = serveStatic('build', { index: ['index.html', 'index.htm'] });

const server = http.createServer(function onRequest(req, res) {
  serve(req, res, finalhandler(req, res));
});

// Listen on port 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
