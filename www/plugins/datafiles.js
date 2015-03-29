var Joi = require('joi');
var path = require('path');

exports.register = function(server, options, next) {
  
  var uploadFile = function(request, reply) {
    reply();
  };

  server.route({
    method: 'POST',
    path: '/datafiles',
    handler: uploadFile,
    config: {
      payload: {
        output: 'stream',
        maxBytes: 1*1000*1000
      },
      validate: {
        payload: {file: Joi.object({
            pipe: Joi.func().required(),
            _data: Joi.binary().min(10)
        }).unknown()}
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'mapper.www.datafiles',
  version: '0.0.1'
};
