  describe('RepoContextSvc', function() {

  var scope;
  var ctrl;
  var repoContextSvc;
  var sandbox;

  beforeEach(module('mapper.repoContext.repoContextSvc'));

  beforeEach(inject(function($injector) {
    sandbox = sinon.sandbox.create();
    repoContextSvc = $injector.get('RepoContextSvc');
  }));

  afterEach(function() {
    sandbox.restore();
  })

  it('initializes with empty repo state', function() {
    repoContextSvc.getRepos().should.eql([]);
  });

  describe('#setRepos', function() {
    it('sets the current repos for the app', function() {
      var valid = ['a/b', 'b/c'];
      
      repoContextSvc.setRepos(valid);
      
      repoContextSvc.getRepos().should.eql(valid);
    });

    it('doesn\'t set when an invalid repo name is passed', function() {
      var partialValid = ['a/b', 'NO'];
      var valid = ['a/b'];
      
      repoContextSvc.setRepos(valid);
      try {
        repoContextSvc.setRepos(partialValid);
      } catch(e) {}

      repoContextSvc.getRepos().should.eql(valid);
    });

    it('throws when an invalid repo name is passed', function() {
      var partialValid = ['a/b', 'NO'];
      var valid = ['a/b'];
      
      repoContextSvc.setRepos(valid);
      var act = function() { repoContextSvc.setRepos(partialValid); };

      var thrown = expect(act).to.throw(ValidationError);
    });
  });

});
