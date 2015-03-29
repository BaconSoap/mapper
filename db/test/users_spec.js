require('./setup.js');
var db = require('../index.js');

var fakeUser = {username: 'fakeUser', password: 'P@ssword'};

describe('model.User', function() {
  var createUser = function(cb) {
    db.model.User.create(fakeUser, cb);
  }

  var getUser = function(cb) {
    db.model.User.findByUsername(fakeUser.username, cb);
  }

  beforeEach(function(done) {
    db.__pool.query("DELETE FROM users WHERE users.username = 'fakeUser';", function(e){
      done();
    });
  });

  describe('#create', function() {
    it('should create a user in the database', function(done) {
      createUser(function() {
        db.__pool.query("SELECT COUNT(*) AS userCount FROM users where users.username = 'fakeUser'", function(e, data) {
          expect(e).to.eql(null);
          data[0]['userCount'].should.eql(1);
          done();
        });
      });
    });

    it('should return the correct userid', function(done) {
      createUser(function(err, userId) {
        db.__pool.query("SELECT users.userid AS uid FROM users WHERE users.username='fakeUser'", function(e, data) {
          data[0]['uid'].should.eql(userId);
          done();
        });
      });
    });
  });

  describe('#findByUsernameAndPassword', function(done) {
    it('should find the user specified if user and password match', function(done) {
      createUser(function(e, userId) {
        db.model.User.findByUsernameAndPassword(fakeUser.username, fakeUser.password, function(e, user) {
          user.username.should.eql(fakeUser.username);
          user.id.should.eql(userId);
          done();
        });
      });
    });

    it('should give null if the password doesn\'t match', function(done) {
      createUser(function(e, userId) {
        db.model.User.findByUsernameAndPassword(fakeUser.username, fakeUser.password + 's ', function(e, user) {
          expect(user).to.eql(null);
          done();
        });
      });
    });
  });
});

