var Joi = require('joi');
var path = require('path');
var uuid = require('node-uuid');
var fs = require('fs');
var open = require('amqplib');

exports.register = function(server, options, next) {
  
  var setupRabbit = function(conn) {
    console.log('connected to rabbitmq at ' + process.env.AMQP_URL);
    var ch = conn.createChannel();
    var ok = ch.then(function(ch){
      return ch.assertExchange('fileUploads', 'topic', {durable: true}).then(function(){return ch;});
    });

    return ch;
  };

  var setupRoutes = function(ch) {
    var uploadFile = function(request, reply) {
      var id = uuid.v4();
      var uploadStream = request.payload['file'];
      var filePath = path.join(process.env.MAPPER_UPLOAD_DIR, id);
      var ws = fs.createWriteStream(filePath, {flags: 'w'});
      uploadStream.pipe(ws);
      uploadStream.on('end', function() {
        var msgData = new Buffer(JSON.stringify({fileId: id, filePath: filePath}));
        ch.publish('fileUploads', 'fileUploaded', msgData);
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

  open.connect(process.env.AMQP_URL).then(setupRabbit).then(setupRoutes);
};

exports.register.attributes = {
  name: 'mapper.www.datafiles',
  version: '0.0.1'
};
