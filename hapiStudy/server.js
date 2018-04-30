'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 3000, host: '127.0.0.1'});

const adds = function (x, y, next) {
  // note that the 'next' callback must be used to return values
  next(null, x + y);
};

server.method('add2', adds, {});

server.route({
  method: 'POST',
  path: '/',
  handler: function (request, reply) {
    let s1;
    server.methods.add2(1, 2, function (err, s) {
      s1 = s
    })
    reply('Hello, world!' + s1);
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.route({
  method: 'GET',
  path: '/hello/{user*3}',
  handler: function (request, reply) {
    const userParts = request.params.user.split('/');
    reply('Hello ' + encodeURIComponent(userParts[0]) + ' ' + encodeURIComponent(userParts[1]) + '!');
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});