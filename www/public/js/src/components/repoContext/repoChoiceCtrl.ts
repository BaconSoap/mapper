///<reference path="../../shared/repoContext/repoContextSvc" />
var app = angular.module('mapper.repoChoice', ['mapper.repoContext.repoContextSvc']);

class RepoChoiceController {
  public initialized: boolean;
  public repos: Array<string>;

  static $inject: Array<string> = ['$log', 'RepoContextSvc'];
  constructor($log, private repoContextSvc: RepoContextSvc) {
    $log.info('RepoChoiceController initialized');
    this.initialized = true;
    this.repos = this.repoContextSvc.getRepos();
  }

  public setRepo(repoName: string) {
    if (/.+\/.+/.test(repoName)) {
      this.repoContextSvc.setRepos([repoName]);
    }
  }
}

app.controller('RepoChoiceCtrl', RepoChoiceController);
