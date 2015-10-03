app.controller('home', ['$scope', function ($scope) {
  $scope.message = 'world';
  $scope.modal = function () {
    $('.ui.basic.modal.home')
    .modal('show');
  }
}])
  // .directive("myLogin", [function () {
  //   function link(scope, element, attr) {
  //     $('#login').click(function () {
  //       $('.ui.basic.modal')
  //       .modal('show');
  //     })
  //   }
  //   return {
  //     link: link
  //   }
  // }])

app.controller('signup', ['$scope', function ($scope) {
  $scope.modal = function () {
    $('.ui.basic.modal.signup')
    .modal('show');
  };
  $scope.dropdown = function () {
    $('.ui.dropdown').dropdown();
  }
}])

app.controller('search', ['$scope', function ($scope) {
}])

app.controller('user', ['$scope', function ($scope) {
  $scope.tab = function () {
    $('.tabular.menu .item').tab();
    $('.ui.accordion').accordion();
    $('.ui.dropdown').dropdown();
  };
  $scope.pacTab = function () {
    $('.menu .item').tab();
  }
  $scope.sidebar = function () {
    $('.tabular.menu .item').tab();
    $('.ui.accordion').accordion();
    $('.ui.sidebar').sidebar('toggle');
  }
}])
