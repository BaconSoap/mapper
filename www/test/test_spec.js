require('./setup.js')

process.env.MAPPER_ENVIRONMENT = 'test';
var server = require('../server.js')();

server.start();

describe('global', function() {
  describe('/index.html', function() {
    it('should not serve files', function(done) {
      request(server.listener).get('/index.html').expect(404, done);
    })
  });
});
