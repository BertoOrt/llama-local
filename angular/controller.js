app.controller('home', ['$scope', function ($scope) {
  $scope.message = 'world';
  $scope.modal = function () {
    $('.ui.basic.modal')
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
  $scope.message = 'apple';
  $scope.modal = function () {
    $('.ui.basic.modal')
    .modal('show');
  }
}])

app.controller('search', ['$scope', function ($scope) {
  $scope.message = 'apple';
}])

app.controller('user', ['$scope', function ($scope) {
  $scope.message = 'apple';
}])
