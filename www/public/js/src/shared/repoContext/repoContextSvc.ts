var app = angular.module('mapper.repoContext.repoContextSvc', []);
class RepoContextSvc {
  private repos: Array<string>;

  constructor() {
    this.repos = [];
  }

  public setRepos(repos: Array<string>) {
    repos.forEach((repoName) => {
      if (!/.+\/.+/.test(repoName)) {
        throw new ValidationError('repoName', 'Invalid repo name: ' + repoName);
      }
    });
    this.repos.length = 0;

    repos.forEach((repoName) => {
      this.repos.push(repoName);
    });
  }

  public getRepos(): Array<string> {
    return this.repos;
  }
}

class ValidationError {
  constructor(public property: string, public message?: string){

  }
}

app.service('RepoContextSvc', RepoContextSvc);
