require('dotenv').load({'path': '../.env'});
var open = require('amqplib').connect(process.env.AMQP_URL);

var createChannel = function(conn) {
  return conn.createChannel();
};

var createExchange = function(ch) {
  var ok = ch.assertExchange('fileUploads', 'topic', {durable: true}).then(function() {
    return ch;
  });
  return ok;
};

var createQueue = function(ch) {
  var ok = ch.assertQueue('fileUploads', {durable: true}).then(function(queue) {
    return {queue: queue.queue, ch: ch };
  });
  return ok;
};

var bindQueue = function(qok){
  var ok = qok.ch.bindQueue(qok.queue, 'fileUploads', 'fileUploaded').then(function() {
    return qok;
  });
  return ok;
};

var listen = function(qok) {
  var listener = function(data) {
    console.log(data.content.toString());
    qok.ch.ack(data)
  };

  console.log('using queue ' + qok.queue);
  qok.ch.consume(qok.queue, listener);
};

open
  .then(createChannel)
  .then(createExchange)
  .then(createQueue)
  .then(bindQueue)
  .then(listen);
