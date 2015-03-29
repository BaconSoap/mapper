var Joi = require('joi');
var Users = require('../../db').model.User;

exports.register = function(server, options, next) {
  registerAuthPlugin(server);

  var postSessionConfig = {
    validate: {
      payload: Users.validator
    }
  };
  var postSession = function(request, reply) {
    Users.findByUsernameAndPassword(request.payload.username, request.payload.password, function(err, user) {
      if (!user) {
        return reply.redirect('/login?message=failed');
      }

      request.auth.session.set(user);
      return reply.redirect('/dashboard');
    });
  };

  var deleteSession = function(request, reply) {
    request.auth.session.clear();
    reply.redirect('/');
  };

  server.route({
    method: 'POST',
    path: '/session',
    handler: postSession,
    config: postSessionConfig
  });

  server.route({
    method: 'DELETE',
    path: '/session',
    handler: deleteSession
  });
  next();
};

function registerAuthPlugin(server) {
  server.register(require('hapi-auth-cookie'), function(err) {
    if (err) {
      throw err;
    }

    server.auth.strategy('session', 'cookie', {
      password: 'this is really insecure',
      cookie: 'sid',
      redirectTo: false,
      isSecure: false,
      ttl: 24 * 60 * 60 * 1000
    });

  })
}

exports.register.attributes = {
  name: 'mapper.www.authentication',
  version: '0.0.1'
};
