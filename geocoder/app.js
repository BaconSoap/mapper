require('dotenv').load({'path': '../.env'});

var listen = function(ch) {
  var listener = function(parsed, data) {
    console.log(parsed);
    ch.ack(data)
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
