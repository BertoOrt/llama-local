app.factory('AuthUser', ['$http', '$location', 'ipCookie', function ($http, $location, ipCookie) {
  var authuser = {
    loggedIn: false,
  };
  authuser.signup = function (data) {
    $http.post('//localhost:3000/signup', data)
      .success(function (response, stat) {
        if (response.status == "ok") {
          console.log('setting cookie');
          this.loggedIn = true;
          return false
          ipCookie('user', response.id, { encode: function (value) { return value; } });
          $location.path('/'+ response.id)
        } else {
          return true
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  };
  authuser.logout = function () {
    this.loggedIn= false;
    ipCookie.remove('user')
  };
  authuser.login = function (data) {
    $http.post('//localhost:3000/login', data)
      .success(function (response, stat) {
        if (response.status == "ok") {
          this.loggedIn = true;
          $('.ui.modal').modal('hide all');
          $location.path('/'+ response.id)
        } else {
          return true
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
  };
  authuser.check = function () {
    return this.loggedIn;
  };
  return authuser
}])
