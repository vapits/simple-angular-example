var myApp = angular.module('myApp', ['ngRoute']);

/* 
* Let's create a services which will manage our
* data source
*/
myApp.service('myTasks', function() {
    
    // This is our source for now
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
    
    // This is our get function for this service.
    // It returns the data source from above
    // TODO make a restFull request and return the results
    // instead of static data.
    this.get = function() {
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
        
    // Let's give to our user a name
    $scope.name = 'Joe';
    
    // Init our tasks scope as an empty array
    $scope.tasks = [];
    
    // Simple function here, if user clicks on the
    // show tasks button then just pass to the scope
    // the items from the injected resolver
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
      replace: 'true',
      template: '<h5></h5>'
  };
});

/* 
* Let's create the routing of our app
*/
myApp.config(
    function($routeProvider, $locationProvider) {
    
    // With $routeProvider you can set your
    // application routes and set rules for errors etc. 
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
