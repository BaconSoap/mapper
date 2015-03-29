var makeServer = function() {
  var Hapi = require('hapi');

  var isDev = process.env.MAPPER_ENVIRONMENT === 'dev';

  var server = new Hapi.Server();
  var port = process.env.MAPPER_WWW_PORT || 1337;
  port = process.env.MAPPER_ENVIRONMENT === 'test'? 13370: port;

  server.connection({
    host: '0.0.0.0',
    port: 1337,
    labels: [process.env.MAPPER_ENVIRONMENT || 'unknown']
  });

  var err = function(e) {
    if (e) {
      console.log('error!')
    }
  };

  if (isDev) {
    server.register({register: require('./plugins/dev.js')}, err);
  }

  server.register(
    [
      {register: require('./plugins/authentication.js')}
    ], err);
  
  return server;
}

module.exports = makeServer;
