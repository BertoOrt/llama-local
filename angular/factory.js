app.factory('AuthUser', ['$http', '$location', 'ipCookie', '$q', function ($http, $location, ipCookie, $q) {
  var authuser = {};
  authuser.signup = function (data) {
    var deferred = $q.defer()
    $http.post('//localhost:3000/signup', data)
      .success(function (response, stat) {
        if (response.status == "ok") {
          ipCookie('user', response.id);
          $location.path('/'+ response.id)
        } else {
          deferred.resolve(true)
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
    return deferred.promise
  };
  authuser.logout = function () {
    ipCookie.remove('user')
    $location.path('/')
  };
  authuser.login = function (data) {
    $http.post('//localhost:3000/login', data)
      .success(function (response, stat) {
        if (response.status == "ok") {
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
    var cookie = ipCookie('user')
    if (!cookie) {
      return false
    }
    return true
  };
  authuser.authenticate = function () {
    var id = $location.path();
    var cookie = ipCookie('user')
    var data = {id, cookie}
    $http.post('//localhost:3000/user/auth', data)
      .success(function (response, stat) {
        if (response.status == "ok") {
          return true
        } else {
          return false
        }
      })
      .error(function (data) {
        return false
      })
    return false;
  }
  return authuser
}])
