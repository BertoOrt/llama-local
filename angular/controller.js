app.controller('home', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.modal = function () {
    $('.ui.basic.modal.home')
    .modal('show');
  }
  $scope.login = function () {
    $scope.loginSubmitted = true;
    var data = {email: $scope.loginEmail, password: $scope.loginPassword};
    $http.post('//localhost:3000/login', data)
      .success(function (response, stat) {
        $scope.loginSubmitted = false;
        if (response.status == "ok") {
          $('.ui.modal').modal('hide all');
          $location.path('/'+ response.id)
        } else {
          $scope.invalidPassword = true;
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  };
}])

app.controller('signup', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.modal = function () {
    $('.ui.basic.modal.signup')
    .modal('show');
  };
  $scope.signup = function () {
    $scope.submitted = true;
    var country = $('.text').text();
    if (country === "Select Country") {
      country = "United States"
    };
    var data = {email: $scope.email, country: country, password: $scope.password};
    $http.post('//localhost:3000/signup', data)
      .success(function (response, stat) {
        $scope.submitted = false;
        if (response.status == "ok") {
          $location.path('/'+ response.id)
        } else {
          console.log(response.status, stat);
          $scope.invalidEmail = true
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  };
  $scope.login = function () {
    $scope.loginSubmitted = true;
    var data = {email: $scope.loginEmail, password: $scope.loginPassword};
    $http.post('//localhost:3000/login', data)
      .success(function (response, stat) {
        $scope.loginSubmitted = false;
        if (response.status == "ok") {
          $('.ui.modal').modal('hide all');
          $location.path('/'+ response.id)
        } else {
          $scope.invalidPassword = true;
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  };
}])
  .directive("myDropdown", [function () {
    function link(scope, element, attr) {
      return $('.ui.dropdown').dropdown();
    }
    return {
      link: link
    }
  }])

app.controller('search', ['$scope', function ($scope) {
  $scope.apple = "apple";
}])

app.controller('user', ['$scope', function ($scope) {
  $scope.addingReview = false;
  $scope.addingPost = false;
  $scope.isChecked = 1;
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
  $scope.addReviewForm = function () {
    $scope.addingReview = !$scope.addingReview;
  }
  $scope.addPostForm = function () {
    $scope.addingPost = !$scope.addingPost;
  }
}])
