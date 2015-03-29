require('../setup.js')

var server = require('../../server.js')();

server.route({
  method: 'GET',
  config: {auth: 'session'},
  path: '/fakeAuthenticatedResource',
  handler: function(req, reply) { return reply('ok'); }
});

var started = false;
server.start();

var creds = function(username, password) {
  return {username: username, password: password};
};

var valid = {username: "andrew", password: "P@ssword"};


describe('mapper.www.authentication', function() {
  
  var agent;
  beforeEach(function() {
    agent = request.agent(server.listener);
  });

  var createPost = function(username, password) {
    return agent
             .post('/session')
             .type('form')
             .send(creds(username, password));
  };

  var login = function() {
    return createPost(valid.username, valid.password);
  }

  it('should deny access to authenticated resources if unauthenticated', function(done) {
    createPost('', '')
      .end(function(err, res) {
        agent
          .get('/fakeAuthenticatedResource')
          .expect(401, done);
      });
  });

  describe('POST /session', function() {
    it('should fail if username is blank', function(done) {
      createPost('', valid.password)
        .expect(/\\"username\\" is not allowed to be empty/)
        .expect(400, done);
    });

    it('should fail if password is blank', function(done) {
      createPost(valid.username, '')
        .expect(/\\"password\\" is not allowed to be empty/)
        .expect(400, done);
    });
    
    it('should fail if user doesn\'t exist', function(done) {
      createPost(valid.username + 'a', valid.password)
        .expect(302)
        .expect('Location', /login/)
        .expect('Location', /message=failed/, done);
    });
    
    it('should set cookie if successful', function(done) {
      login()
        .expect('set-cookie', /sid=.+/, done);
    });
    
    it('should redirect if successful', function(done) {
      login()
        .expect(302)
        .expect('Location', /dashboard/, done)
    });

    it('should give access to authenticated resources', function(done) {
      login()
        .end(function(err, res) {
          agent
            .get('/fakeAuthenticatedResource')
            .expect(200)
            .expect('ok', done);
        })
    });
  });

  describe('DELETE /session', function() {
    it('should delete cookie', function(done) {
      agent
        .delete('/session')
        .expect('set-cookie', /sid=;/, done);
    });

    it('should prevent access to authenticated resources', function(done) {
      login()
        .end(function(err, res) {
          agent
            .delete('/session')
            .end(function(e2, r2) {
              agent
                .get('/fakeAuthenticatedResource')
                .expect(401, done);
            });
        });
    });
  });
});
