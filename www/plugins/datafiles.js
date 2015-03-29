var Joi = require('joi');
var path = require('path');
var uuid = require('node-uuid');
var fs = require('fs');

exports.register = function(server, options, next) {
  
  var uploadFile = function(request, reply) {
    var id = uuid.v4();
    var uploadStream = request.payload['file'];
    var filePath = path.join(process.env.MAPPER_UPLOAD_DIR, id);
    var ws = fs.createWriteStream(filePath, {flags: 'w'});
    uploadStream.pipe(ws);
    uploadStream.on('end', function(){
      reply({fileId: id});
    });
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
            _data: Joi.binary().min(10).max(1*1000*1000)
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
