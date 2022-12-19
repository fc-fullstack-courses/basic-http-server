const http = require('http');

function requestListener(request, response) {
  response.end('hello there');
}

const server = http.createServer(requestListener);

server.listen(5000);
