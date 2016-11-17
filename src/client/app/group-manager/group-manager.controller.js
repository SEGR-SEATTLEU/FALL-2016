(function() {
  'use strict';

  angular
    .module('wta.group-manager')
    .controller('GroupManagerController', GroupManagerController);

  GroupManagerController.$inject = ['logger', 'WtaApi'];

  function GroupManagerController(logger, WtaApi) {
    var vm = this;
    vm.headerText = "Group Manager";
    vm.groups = [];
    vm.groupMembers = [];
    vm.roles = [];
    vm.groupManagerPage;
    vm.groupMembersPage;
    
    vm.getGroups = getGroups;
    vm.getGroupMembers = getGroupMembers;
    vm.getRoles = getRoles;
    vm.createGroup = createGroup;
    vm.moveUser = moveUser;
    vm.activate = activate;
  
    activate();

    function activate() {
      vm.groupManagerPage = true;
      vm.groupMembersPage = false;
      getGroups();
      getRoles();
      logger.info("Display groups");
    }

    function getGroups() {
      console.log("The getGroups function has been called successfully");
      WtaApi.getGroups().then(function(groups) {
        vm.groups = groups;
      });
    }

    function getRoles() {
      console.log("The getRoles function has been called successfully");
      WtaApi.getRoles().then(function(roles) {
        vm.roles = roles;
      });
    }

    function getGroupMembers(groupID) {
      vm.groupMembersPage = true;
      vm.groupManagerPage = false;
      console.log("The getGroupMembers function has been called successfully");
      WtaApi.getGroupMembers(groupID).then(function(groupMembers) {
        vm.groupMembers = groupMembers;
      });
    }

    function createGroup(groupName, roleID) {
      console.log("The createGroup function has been called successfully");
      WtaApi.createGroup(groupName, roleID).then(function(res) {
        if( res === true ) {
          vm.requestSuccessful = true;
          activate();
          $("#newGroupName").value = "";
        } else {
          // error handle
        }
      });
    }

    function moveUser(groupID, userID, previousGroup) {
      console.log("The moveUser function has been called successfully");
      WtaApi.moveUser(groupID, userID).then(function(res) {
        if( res === true ) {
          vm.requestSuccessful = true;
          getGroupMembers(previousGroup);
        } else {
          // error handle
        }
      });
    }
  }  
})();