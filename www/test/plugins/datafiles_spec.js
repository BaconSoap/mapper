require('../setup.js')
var mockFs = require('mock-fs');
var fs;

var server = require('../../server.js')();
server.start();

describe('mapper.www.datafiles', function() {
  afterEach(function() {
    mockFs.restore();
  });

  var configFs = function(name, contents) {
    var config = {};
    config[__dirname + '/' + name] = contents;
    fs = mockFs.fs(config);
  };

  var setupValidUpload = function(name, contents) {
    configFs('tenBytes', '1234567890')
    
    return request(server.listener)
      .post('/datafiles')
      .field('file', fs.createReadStream(__dirname + '/tenBytes'));
  }

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
    setupValidUpload()
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
    configFs('overOneMeg', new Array(1*1024*1024).join('a') + 'b')
    
    request(server.listener)
      .post('/datafiles')
      .field('file', fs.createReadStream(__dirname + '/overOneMeg'))
      .expect(/1000000 bytes/)
      .expect(400, done);
  });

  it('returns an id for valid uploads', function(done) {
    setupValidUpload()
      .end(function(err, data) {
        data.body.fileId.length.should.be.greaterThan(10);
        done();
      });
  })

});
