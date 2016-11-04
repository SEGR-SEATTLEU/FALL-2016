(function() {
  'use strict';

  angular
    .module('todo.todo')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'todo',
        config: {
          url: '/todo',
          templateUrl: '/src/client/app/todo/todo.html',
          controller: 'TodoController',
          controllerAs: 'vm',
          title: 'Todo'
        }
      }
    ];
  }
})();