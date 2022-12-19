const http = require('http');

const usersDb = [
  {
    login: 'user1',
    password: '12345admin',
  },
  {
    login: 'user2',
    password: 'asdsafafa',
  },
];

function requestListener(request, response) {
  const { method, url } = request;
  if (method === 'GET') {
    if (url === '/') {
      response.end('<h1>Main page</h1>');
    } else if (url === '/login') {
      response.end(`<h1>login page</h1>`);
    }
  } else if (method === 'POST') {
    if (url === '/login') {
      let jsonString = '';
      request.on('data', (chunk) => {
        jsonString += chunk;
      });

      request.on('end', () => {
        const userObj = JSON.parse(jsonString);

        const foundUser = usersDb.find((user) => user.login === userObj.login);

        if(!foundUser) {
          response.statusCode = 401;
          response.end('invalid data');
        }

        if (foundUser.password === userObj.password) {
          response.end('you are logged in');
        } else {
          response.statusCode = 401;
          response.end('invalid data');
        }
      });
    }
  }
}

const server = http.createServer(requestListener);

server.listen(5000);
