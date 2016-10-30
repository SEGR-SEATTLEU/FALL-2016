(function() {
  'use strict';

  angular
    .module('todo.todo')
    .controller('TodoController', TodoController);

  TodoController.$inject = ['logger', 'TodoApi'];
  function TodoController(logger, TodoApi) {
    var vm = this;
    vm.title = 'Admin';
    vm.statusFilter = 'null';
    vm.todoList = [];
    vm.newItem = '';
    
    vm.insertTodoItem = insertTodoItem;
    vm.removeTodoItem = removeTodoItem;
    vm.updateTodoItem = updateTodoItem;
    vm.clearCompletedItems = clearCompletedItems;

    activate();
    
    /////////////////////

    function activate() {
      return getTodoList().then(function() {
          logger.info('Activated Todo Controller');
      });
    }
    
    function getTodoList() {
      return TodoApi.getTodoList()
          .then(function(data) {
            vm.todoList = data;
            return vm.todoList;
          });
    }
    
    function insertTodoItem(title) {
      
      if(title === '') {
        return;
      }
      
      // Create our Todo Item Model from the title given to us
      var item = {
        title: title,
        completed: false,
        Key: _createRandomString(16)
      };
      
      return TodoApi.insertTodoItem(item)
        .then(function(data) {
          var indexOfData = _getIndexOfTodoItem(vm.todoList, data);
          if(indexOfData === -1) {
            vm.todoList.push(data);
          }
          vm.newItem = '';
          return data;
        });
        
    }
    
    function removeTodoItem(item) {
      
      if(item === null || item === {}) {
        return;
      }
      
      return TodoApi.deleteTodoItem(item)
        .then(function(data) {
          var indexOfData = _getIndexOfTodoItem(vm.todoList, data);
          if(indexOfData !== -1) {
            vm.todoList.splice(indexOfData, 1);
          }
          return data;
        });
    }
    
    function updateTodoItem(item) {
      
      if(item === null || item === {}) {
        return;
      }
      
      var index = vm.todoList.indexOf(item);
      
      return TodoApi.updateTodoItem(item)
        .then(function(data) {
          if(!_todoItemsEqual(vm.todoList[index], data)) {
            vm.todoList[index] = data;
          }
          return data;
        });
    }
    
    function clearCompletedItems() {
      return TodoApi.clearCompleted()
        .then(function(data) {
          if(vm.todoList !== data) {
            vm.todoList = data;
          }
          return vm.todoList;
        });
    }
  }
  
  function _createRandomString(N) {
    return Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
  }
  
  function _todoItemsEqual(one, two) {
    if(one.Key !== two.Key || one.title !== two.title || one.completed !== two.completed)
      return false;
    return true;
  }
  
  function _getIndexOfTodoItem(todos, item) {
    return todos.map(function(el) {
      return el.Key;
    }).indexOf(item.Key);
  }
})();