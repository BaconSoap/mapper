describe('RepoChoiceCtrl', function() {

  var scope;
  var ctrl;
  var RepoContextSvc;
  var sandbox;
  var $controller;

  beforeEach(module('mapper.repoChoice'));

  beforeEach(inject(function($rootScope, _$controller_, _RepoContextSvc_) {
    RepoContextSvc = _RepoContextSvc_;
    $controller = _$controller_;
    scope = $rootScope.$new();
    sandbox = sinon.sandbox.create();
    sandbox.stub(RepoContextSvc);
    ctrl = createCtrl();
  }));

  function createCtrl() {
    return $controller('RepoChoiceCtrl', {'RepoContextSvc': RepoContextSvc});
  }

  afterEach(function() {
    sandbox.restore();
  })

  it('should be initialized', function(){
    expect(ctrl.initialized).to.equal(true);
  });

  it('should set initial repos', function() {
    RepoContextSvc.getRepos.restore();
    sandbox.stub(RepoContextSvc, 'getRepos', function() {return ['a'];});
    ctrl = createCtrl();
    ctrl.repos.should.eql(['a']);
  });

  describe('#setRepo', function() {
    it('sets global current repos', function() {
      var repoName = 'baconsoap/test';
      ctrl.setRepo(repoName);
      RepoContextSvc.setRepos.should.have.been.calledWith([repoName]);
    });
    
    it('only calls repoSvc.setRepos if repo name is valid', function(){
      var repoName = 'invalid repo name';
      ctrl.setRepo(repoName);
      RepoContextSvc.setRepos.should.not.have.been.called;
    });
  });
});
