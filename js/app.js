var myApp = angular.module('myApp', ['ngRoute']);

/* 
* Let's create a services which will manage our
* data source
*/
myApp.service('myTasks', function() {

	var _this = this;
    
    var userTasks = [
        {
            content: "Go buy beers"
        },
        {
            content: "Come back and drink beers"
        },
        {
            content: "Go to sleed"
        }
    ];
    
    _this.get = function() {
    	return userTasks;
    };
    
});

/* 
* This our controller
* It hold on the functionality of our interface
* and reacts with changes in it.
*/
myApp.controller('MyController', 
    function($scope, tasks) {

        $scope.name = 'Joe';
        
        $scope.tasks = [];
        
        $scope.showTasks = function() {
        	$scope.tasks = tasks; 
        };
});

/* 
* Here we are creating a directive <task></task>
* Which is actually a simple h5 element that we can
* bind anything we want in.
*/
myApp.directive('task', function() {
  return {
    scope: {},
    restrict: 'AE',
    replace: 'true',
    template: '<h5></h5>'
  };
});

/* 
* Let's create the routing of our app
*/
myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'templates/template.html',
    controller: 'MyController',
    resolve: {
    	tasks: function(myTasks) {
      		return myTasks.get();
      	}
    }
  });

  // Enable Html5 Mode
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  
});
