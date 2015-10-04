let app = angular.module('app', ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'home'
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'signup'
      })
      .when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'search'
      })
      .when('/error', {
        templateUrl: 'partials/error.html'
      })
      .when('/:user', {
        templateUrl: 'partials/user.html',
        controller: 'user'
      })
      .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
}]);
