require('./fileloader.js');
var db = require('../db/index.js');
var csv = require('fast-csv');

var listen = function(ch) {
  var listener = function(parsed, data) {
    loadFile(parsed.filePath, parsed.fileId, function(fileData) {
      db.model.FileData.loadFile(fileData.data, fileData.headers, parsed.fileId, function(e) {
        if (e) {
          console.error(e);
        } else {
          console.log('loaded ' + parsed.filePath + ' to `tmp.' + parsed.fileId + '`');
          ch.publish('fileLoads', 'fileLoaded', {fileId: parsed.fileId, tableName: 'tmp.' + parsed.fileId});
        }
        ch.ack(data)
      });
    });
  };

  console.log('using queue fileUploads');
  ch.consume('fileUploads', listener);
};

require('amqp.channel')(process.env.AMQP_URL, {
  assertExchange: [['fileUploads', 'topic', {durable: true}]],
  assertQueue: [['fileUploads', {durable: true}]],
  bindQueue: [['fileUploads', 'fileUploads', 'fileUploaded']]
}).then(listen);

process.once('SIGINT', error);

function error(e){
  process.exit(1);
}

var loadFile = function(path, id, cb) {
  var data = [];
  csv
    .fromPath(path)
    .on('data', function(row) { data.push(row) } )
    .on('end', function() {
      var parsed = {};
      var h = (data.splice(0, 1))[0];
      for (var i = 0; i < h.length; i++) {
        h[i] = h[i].trim();
      }
      parsed.headers = h;
      parsed.data = data;
      console.log(parsed);
      cb(parsed);
    });
};
