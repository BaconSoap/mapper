var app = angular.module('mapper.repoContext.repoContextSvc', []);
var RepoContextSvc = (function () {
    function RepoContextSvc() {
        this.repos = [];
    }
    RepoContextSvc.prototype.setRepos = function (repos) {
        var _this = this;
        repos.forEach(function (repoName) {
            if (!/.+\/.+/.test(repoName)) {
                throw new ValidationError('repoName', 'Invalid repo name: ' + repoName);
            }
        });
        this.repos.length = 0;
        repos.forEach(function (repoName) {
            _this.repos.push(repoName);
        });
    };
    RepoContextSvc.prototype.getRepos = function () {
        return this.repos;
    };
    return RepoContextSvc;
})();
var ValidationError = (function () {
    function ValidationError(property, message) {
        this.property = property;
        this.message = message;
    }
    return ValidationError;
})();
app.service('RepoContextSvc', RepoContextSvc);

///<reference path="../../shared/repoContext/repoContextSvc" />
var app = angular.module('mapper.repoChoice', ['mapper.repoContext.repoContextSvc']);
var RepoChoiceController = (function () {
    function RepoChoiceController($log, repoContextSvc) {
        this.repoContextSvc = repoContextSvc;
        $log.info('RepoChoiceController initialized');
        this.initialized = true;
        this.repos = this.repoContextSvc.getRepos();
    }
    RepoChoiceController.prototype.setRepo = function (repoName) {
        if (/.+\/.+/.test(repoName)) {
            this.repoContextSvc.setRepos([repoName]);
        }
    };
    RepoChoiceController.$inject = ['$log', 'RepoContextSvc'];
    return RepoChoiceController;
})();
app.controller('RepoChoiceCtrl', RepoChoiceController);

///<reference path="components/repoContext/repoChoiceCtrl.ts" />
var app = angular.module('mapper', ['mapper.repoChoice', 'mapper.views']);
