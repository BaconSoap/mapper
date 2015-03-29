require('../setup.js')
var fs = require('fs');
var mockFs = require('mock-fs');

var server = require('../../server.js')();
server.start();

describe('mapper.www.datafiles', function() {
  afterEach(function() {
    mockFs.restore();
  });

  var configFs = function(name, contents) {
    var config = {};
    config[__dirname + '/' + name] = contents;
    mockFs(config);
  };

  it('rejects empty files', function(done) {
    configFs('empty', '');
    request(server.listener)
      .post('/datafiles')
      .field('file', fs.createReadStream(__dirname + '/empty'))
      .expect(/at least 10 bytes/)
      .expect(400, done);
  });

  it('files under 10 bytes', function(done) {
    configFs('nineBytes', '123456789')
    request(server.listener)
      .post('/datafiles')
      .field('file', fs.createReadStream(__dirname + '/nineBytes'))
      .expect(/at least 10 bytes/)
      .expect(400, done);
  });

  it('accepts files at least 10 bytes large', function(done) {
    configFs('tenBytes', '1234567890')
    
    request(server.listener)
      .post('/datafiles')
      .field('file', fs.createReadStream(__dirname + '/tenBytes'))
      .expect(200, done);
  });

  it('accepts files up to a megabyte large', function(done) {
    configFs('oneMeg', new Array(1*1000*999).join('1'))
    
    request(server.listener)
      .post('/datafiles')
      .field('file', fs.createReadStream(__dirname + '/oneMeg'))
      .expect(200, done);
  });

  it('rejects files over a megabyte', function(done) {
    configFs('oneMeg', new Array(1*1000*1000).join('1'))
    
    request(server.listener)
      .post('/datafiles')
      .field('file', fs.createReadStream(__dirname + '/oneMeg'))
      .expect(/allowed: 1000000/)
      .expect(400, done);
  });
});
