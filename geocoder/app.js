require('dotenv').load({'path': '../.env'});

var listen = function(ch) {
  var listener = function(parsed, data) {
    console.log(parsed);
    ch.ack(data)
  };

  console.log('using queue fileLoads');
  ch.consume('fileLoads', listener);
};

require('amqp.channel')(process.env.AMQP_URL, {
  assertExchange: [['fileLoads', 'topic', {durable: true}]],
  assertQueue: [['fileLoads', {durable: true}]],
  bindQueue: [['fileLoads', 'fileLoads', 'fileLoaded']]
}).then(listen);

process.once('SIGINT', error);

function error(e){
  process.exit(1);
}
