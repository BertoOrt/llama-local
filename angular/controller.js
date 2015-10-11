app.controller('home', ['$scope', '$http', '$location', 'AuthUser', 'ipCookie', function ($scope, $http, $location, AuthUser, ipCookie) {
  $scope.loggedIn = AuthUser.check()
  if ($scope.loggedIn) $scope.userId = ipCookie('user')
  $scope.modal = function () {
    $('.ui.basic.modal.home')
    .modal('show');
  }
  $scope.login = function () {
    $scope.loginSubmitted = true;
    var data = {email: $scope.loginEmail, password: $scope.loginPassword};
    var result = AuthUser.login(data);
    if (result) {
      $scope.invalidPassword = true;
    }
  };
}])

app.controller('signup', ['$scope', '$http', '$location', 'ipCookie', 'AuthUser', function ($scope, $http, $location, ipCookie, AuthUser) {
  $scope.loggedIn = AuthUser.check()
  if ($scope.loggedIn) $location.path('/')
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
    $scope.submitted = true;
    AuthUser.signup(data).then(function (result) {
      if (result) {
        $scope.submitted = false;
        $scope.invalidEmail = true
      } else {
        $scope.submitted = false;
      }
    })
  };
  $scope.login = function () {
    $scope.loginSubmitted = true;
    var data = {email: $scope.loginEmail, password: $scope.loginPassword};
    var result = AuthUser.login(data);
    if (result) {
      $scope.invalidPassword = true;
    }
  };
}])

app.controller('search', ['$scope', function ($scope) {
  $scope.loggedIn = AuthUser.check()
}])

app.controller('user', ['$scope', '$http', 'ipCookie','$location', 'AuthUser', function ($scope, $http, ipCookie, $location, AuthUser) {
  $scope.loggedIn = AuthUser.check()
  AuthUser.authenticate().then(function (result) {
    $scope.owner = result
  })
  $scope.addingReview = false;
  $scope.addingPost = false;
  $scope.isChecked = 1;
  $scope.user = {id: ipCookie('user')}
  $http.post('//localhost:3000/user/info', {id: $scope.user.id, url: $location.path().substring(1)})
    .success(function (response, stat) {
      if (response.status == "ok") {
        $scope.user.name = response.body.name
        $scope.user.country = response.body.country
        $scope.user.email = response.body.email
        $scope.user.about = response.body.about
        $scope.user.headline = response.body.headline
        $scope.user.language = response.body.language
      } else {
        $location.path('/')
      }
    })
    .error(function (data) {
      $location.path('/error')
    })
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
  $scope.logout = function () {
    AuthUser.logout()
  }
  $scope.submitBioForm = function () {
    var country = $('.countryDropdown').text();
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
        } else {
          console.log('error: could not save');
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  }
}])
