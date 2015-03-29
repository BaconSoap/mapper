var path = require('path');

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '/../', 'public'),
        listing: true,
        index: true
      }
    }
  });
  console.log('dev environment - using hapi for static files')
  next();
};

exports.register.attributes = {
  name: 'mapper.www.dev',
  version: '0.0.1'
};
