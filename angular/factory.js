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
    var promise = $q.defer();
    $http.post('//localhost:3000/login', data)
      .success(function (response, stat) {
        console.log(response);
        if (response.status == "ok") {
          $('.ui.modal').modal('hide all');
          ipCookie('user', response.id)
          $location.path('/'+ response.id)
        } else {
          return promise.resolve(true);
        }
      })
      .error(function (data) {
        $location.path('/error')
      })
    return promise.promise;
  };
  authuser.check = function () {
    var cookie = ipCookie('user')
    if (!cookie) {
      return false
    }
    return true
  };
  authuser.authenticate = function () {
    var promise = $q.defer();
    var url = $location.path().substring(1);
    var cookie = ipCookie('user');
    var data = {url, cookie};
    $http.post('//localhost:3000/user/auth', data)
      .success(function (response, stat) {
        if (response.status == "ok") {
          return promise.resolve(true)
        } else {
          return false
        }
      })
      .error(function (data) {
        return false
      })
    return promise.promise;
  }
  return authuser
}])
