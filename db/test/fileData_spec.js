require('./setup.js');
var db = require('../index.js');

var fakeUser = {username: 'fakeUser', password: 'P@ssword'};

describe('model.FileData', function() {
  var testTable = '121908hfvnh=1r23=f-12e-afs';
  var testHeaders = ['id', 'address'];
  afterEach(function(done){
    db.__pool.query('DROP TABLE IF EXISTS `tmp.' + testTable + '`', done);
  });

  describe('#loadFile', function() {
    it('should load file data', function(done) {
      db.model.FileData.loadFile('/vagrant/test.csv', testHeaders, testTable, function(e, data) {
        db.__pool.query('SELECT COUNT(*) AS countData FROM `tmp.' + testTable + '`', function(err, data) {
          data[0]['countData'].should.eql(13);
          done();
        });
      });
    });
  });

});

