require('../setup.js')

process.env.MAPPER_ENVIRONMENT = 'dev';
var server = require('../../server.js')();

var started = false;
server.start();


describe('dev', function() {
  describe('/index.html', function() {
    it('should serve the index file', function(done) {
      request(server.listener).get('/index.html').expect(/index\.html/).expect(200, done);
    })
  });
});
