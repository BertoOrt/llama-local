let app = angular.module('app', ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'home'
      })
      .when('/:user', {
        templateUrl: 'partials/user.html',
        controller: 'user'
      })
      .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
}]);
