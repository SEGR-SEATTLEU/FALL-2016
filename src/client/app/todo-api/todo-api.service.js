(function() {
  'use strict';
  
  angular.module('todo.api')
    .factory('TodoApi', TodoApi);
    
    TodoApi.$inject = [ '$injector', 'StorageServicePicker' ];
    function TodoApi($injector, StorageServicePicker) {
        var todoList = [];
        
        // Here we are injecting the storage service that we want
        // depending on the StorageServicePicker constant. You can
        // change which API this application interacts with by changing
        // that constant in storageservice.constant.js
        var storageService; 
        if(StorageServicePicker === 'Dot Net Api') {
            storageService = $injector.get('DotNetApi');
        } else if(StorageServicePicker === 'Local Storage') {
            storageService = $injector.get('LocalStorage');
        }
        
        var service = {
            getTodoList: storageService.get,
            insertTodoItem: storageService.insert,
            updateTodoItem: storageService.put,
            deleteTodoItem: storageService.delete,
            clearCompleted: storageService.clearCompleted
        };
        
        if(StorageServicePicker === 'Local Storage') {
            service.clearCompleted = clearCompleted;
        }
        
        return service;
        
        /////////////////////
        
        function clearCompleted() {
            return storageService.clearOnProperty('completed');
        }
    }
  
})();