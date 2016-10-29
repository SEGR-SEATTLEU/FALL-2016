(function() {
  'use strict';
  
  var STORAGE_ID = 'todos-angularjs';
  
  angular.module('todo.api')
    .factory('LocalStorage', LocalStorage);
  
  LocalStorage.$inject = [ '$q' ];
  function LocalStorage( $q ) {
    var vm = this;
    
    vm.items = [];
    
    var service = {
      get : get,
      insert: insert,
      put: put,
      delete: remove,
      clearOnProperty: clearOnProperty
    }
    return service;
    
    /////////////////////
    
    function get() {
      var deferred = $q.defer();
      
      angular.copy(_getFromLocalStorage(), vm.items);
      deferred.resolve(vm.items);
      
      return deferred.promise;
    }
    
    function insert(item) {
      var deferred = $q.defer();
      
      vm.items.push(item);
      
      _saveToLocalStorage(vm.items); 
      deferred.resolve(item);
      
      return deferred.promise;
    }
    
    function put(item) {
      var deferred = $q.defer();
      
      var index = vm.items.map(function(el) {
        return el.Key;
      }).indexOf(item.Key);
      
      vm.items[index] = item;
      
      _saveToLocalStorage(vm.items);
      deferred.resolve(item);
      
      return deferred.promise;
    }
    
    function remove(item) {
      var deferred = $q.defer();
      
      vm.items.splice(vm.items.indexOf(item), 1);
      
      _saveToLocalStorage(vm.items);
      deferred.resolve(item);
      
      return deferred.promise;
    }
    
    function clearOnProperty(itemProperty) {
      var deferred = $q.defer();
      
      var notProperty = vm.items.filter(function (item) {
        return !item[itemProperty];
      });
      
      angular.copy(notProperty, vm.items);
      
      _saveToLocalStorage(vm.items);
      deferred.resolve(vm.items);
      
      return deferred.promise;
    }
    
  }
  
  function _getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }
  
  function _saveToLocalStorage(items) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(items));
  }
  
})();