require('dotenv').load({'path': '../.env'});
var server = require('./server.js')();

server.start(function() {
  console.log('started web server');
});
