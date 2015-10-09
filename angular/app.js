var app = angular.module('app', ['ngAnimate', 'ui.router', 'ipCookie']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url:'/',
        templateUrl: 'partials/home.html',
        controller: 'home'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'signup'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'partials/search.html',
        controller: 'search'
      })
      .state('error', {
        url: '/error',
        templateUrl: 'partials/error.html'
      })
      .state('user', {
        url: '/:user',
        templateUrl: 'partials/user.html',
        controller: 'user'
      })
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
}]);
