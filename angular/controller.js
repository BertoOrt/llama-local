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

app.controller('signup', ['$scope', '$http', '$location', 'ipCookie', function ($scope, $http, $location, ipCookie) {
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
          ipCookie('user', response.id, { encode: function (value) { return value; } });
          $location.path('/'+ response.id)
        } else {
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

app.controller('user', ['$scope', '$http', 'ipCookie','$location', function ($scope, $http, ipCookie, $location) {
  $scope.addingReview = false;
  $scope.addingPost = false;
  $scope.isChecked = 1;
  $scope.user = {id: ipCookie('user')}
  $http.get('//localhost:3000/info')
    // .success(function (response, stat) {
    //   if (response.status == "ok") {
    //     $scope.user.name = response.body.name
    //     $scope.user.country = response.body.country
    //     $scope.user.email = response.body.email
    //     $scope.user.about = response.body.about
    //     $scope.user.headline = response.body.headline
    //     $scope.user.language = response.body.language
    //   } else {
    //     console.log('error');
    //   }
    // })
    // .error(function (data) {
    //   $location.path('/error')
    // })
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
  $scope.submitBioForm = function () {
    var country = $('.countryDropdown').text();
    console.log(country);
    if (country !== "Select Country") {
      $scope.user.country = country
    };
    $scope.sendingInfo = true;
    $http.post('//localhost:3000/user/editInfo', $scope.user)
      .success(function (response, stat) {
        $scope.sendingInfo = false;
        if (response.status == "ok") {
          $('.bioTab').click()
          $('.message').fadeIn()
          setTimeout(function () {
            $('.message').fadeOut()
          }, 3000);
          console.log('flash message');
        } else {
          console.log('error');
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
    console.log('info: ', $scope.user);
  }
}])
  .directive("myDropdown", [function () {
  function link(scope, element, attr) {
    return $('.ui.dropdown').dropdown();
  }
  return {
    link: link
  }
}])
