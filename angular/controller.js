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
      $scope.loginSubmitted = false;
      $scope.invalidPassword = true;
    }
  };
  $scope.email = function () {
    $('.ui.modal.email').modal('show');
  }
  $scope.sendMail = function () {
    var data = {from: $scope.contactEmail, subject: $scope.contactSubject, body: $scope.contactBody}
    $scope.emailError = false;
    $scope.emailSent = false;
    $http.post('//localhost:3000/mail', data)
      .success(function (response) {
        if (response.message == "success") {
          $scope.emailSent = true;
        } else {
          $scope.emailError = true;
        }
      })
      .error(function () {
        $scope.emailError = true;
      })
  }
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

app.controller('search', ['$scope', 'AuthUser', '$http', '$location', function ($scope, AuthUser, $http, $location) {
  $scope.loggedIn = AuthUser.check()
  $scope.search = $location.search().country
  $http.get('//localhost:3000/users')
    .success(function (response) {
      console.log(response);
      var search = $location.search().country.toLowerCase().split(' ')[0]
      $scope.users = []
      response.body.forEach(function (user) {
        if (user.country && user.country.toLowerCase().indexOf(search) > -1) {
          user.profile = 'http://orig08.deviantart.net/b97a/f/2013/045/1/e/profile_picture_by_llama_giver_123-d5uwh54.jpg'
          if (user.profileImage) {
            user.profile = '//localhost:3000/user/' + user._id + '/image'
          }
          $scope.users.push(user)
        }
      })
      console.log($scope.users);
    })
    .error(function () {
      $location.path('/error')
    })
}])

app.controller('user', ['$scope', '$http', 'ipCookie','$location', 'AuthUser', function ($scope, $http, ipCookie, $location, AuthUser) {
  $scope.loggedIn = AuthUser.check()
  AuthUser.authenticate().then(function (result) {
    $scope.owner = result
  })
  $scope.addingReview = false;
  $scope.addingPost = false;
  $scope.taken = false;
  $scope.newPackage = false;
  $scope.isChecked = 1;
  $scope.user = {id: ipCookie('user')};
  $scope.url = $location.path().substring(1);
  $http.post('//localhost:3000/user/info', {id: $scope.user.id, url: $scope.url})
    .success(function (response, stat) {
      if (response.status == "ok") {
        $scope.user.name = response.body.name
        $scope.user.country = response.body.country
        $scope.user.email = response.body.email
        $scope.user.about = response.body.about
        $scope.user.headline = response.body.headline
        $scope.user.language = response.body.language
        $scope.user.packages = response.body.packages
        $scope.user.reviews = response.body.reviews
        $scope.user.facebookId = response.body.facebookId
        $scope.user.facebookToken = response.body.facebookToken
        $scope.user.profile = 'http://orig08.deviantart.net/b97a/f/2013/045/1/e/profile_picture_by_llama_giver_123-d5uwh54.jpg'
        if (response.body.profileImage) {
          $scope.user.profile = '//localhost:3000/user/' + response.body._id + '/image'
        }
        if (!$scope.user.packages) {
          $scope.noPackages = true;
          $scope.user.packages = [];
        }
        if (!$scope.user.reviews) {
          $scope.noReviews = true;
          $scope.user.reviews = [];
        }
        if (response.body.reference) {
          $location.path('/' + response.body.reference)
        }
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
          $('.bioMessage').fadeIn()
          setTimeout(function () {
            $('.bioMessage').fadeOut()
          }, 3000);
        } else {
          console.log('error: could not save');
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  }
  $scope.submitPackageForm = function () {
    $scope.sendingInfo = true;
    $scope.noPackages = false;
    $scope.user.packages.push($scope.package);
    $http.post('//localhost:3000/user/package', {id: ipCookie('user'), package: $scope.package})
      .success(function (response, stat) {
        $scope.sendingInfo = false;
        if (response.status == "ok") {
          $scope.package = "";
          $('.packageMessage').fadeIn()
          setTimeout(function () {
            $('.packageMessage').fadeOut()
          }, 3000);
        } else {
          console.log('error: could not save');
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  }
  $scope.changeUrl = function () {
    var data = {id:ipCookie('user'), url: $scope.url}
    $http.post('//localhost:3000/user/url', data)
      .success(function (response) {
        if (response.status == "ok") {
          $location.path('/' + response.reference)
        } else {
          $scope.taken = true;
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  };
  $scope.editPackage = function () {
    $http.post('//localhost:3000/user/editPackage', {id: ipCookie('user'), package: this.package})
      .success(function (response, stat) {
        $scope.sendingInfo = false;
        if (response.status == "ok") {
          $('.packageTab').click()
          $('.packageMessage').fadeIn()
          setTimeout(function () {
            $('.packageMessage').fadeOut()
          }, 3000);
        } else {
          console.log('error: could not save');
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  };
  $scope.togglePackageForm = function () {
    $scope.newPackage = !$scope.newPackage;
  }
  $scope.removePackage = function (i) {
    $scope.user.packages.splice(i, 1);
    $http.post('//localhost:3000/user/removePackage', {id: ipCookie('user'), package: this.package})
      .success(function (response, stat) {
        $scope.sendingInfo = false;
        if (response.status == "ok") {
          console.log('deleted');
        } else {
          console.log('error: could not save');
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  }
  $scope.submitReview = function () {
    $scope.addingReview = !$scope.addingReview;
    $scope.user.reviews.push({badge: $scope.isChecked, review: $scope.reviewText, by: ipCookie('user'), byName: 'You!'})
    console.log('submitted', $scope.isChecked, $scope.reviewText);
    $scope.noReviews = false;
    $http.post('//localhost:3000/user/addReview', {id: ipCookie('user'), reference: $location.path().substring(1), badge: $scope.isChecked, review: $scope.reviewText})
      .success(function (response) {
        $scope.isChecked = '';
        $scope.reviewText = '';
      })
      .error(function (data) {
        $location.path('/error')
      })
  }
  $scope.share = function () {
    $scope.shareSuccess = false;
    $scope.shareError = false;
    $http.post('//localhost:3000/user/share', {id: $scope.user.facebookId, token: $scope.user.facebookToken, url: $location.path().substring(1)})
      .success(function (response) {
        console.log(response);
        if (response.status == "ok") {
          $scope.shareSuccess = true;
        } else {
          $scope.shareError = true;
        }
      })
      .error(function () {
        console.log('errror');
        $scope.shareError = true;
      })
  }
}])
