/**
 * Created by najie on 30/09/15.
 */
app.factory('User', function($rootScope, $q, $http) {
    return {
        login: function(pseudo, password) {
            console.log(pseudo, password);
            var deferred = $q.defer();
            $http.post($rootScope.apiUrl+"user/login/", {
                pseudo: pseudo,
                password: password
            })
                .success(function(data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    deferred.resolve(response);
                })
                .error(function(data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        register: function(pseudo, password) {
            var deferred = $q.defer();
            $http.post($rootScope.apiUrl+"user/", {
                pseudo: pseudo,
                password: password
            })
                .success(function(data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    deferred.resolve(response);
                })
                .error(function(data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        findOne: function(userId) {
            var deferred = $q.defer();
            $http.get($rootScope.apiUrl+"user/"+userId)
                .success(function(data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('User', response);
                    deferred.resolve(response);
                })
                .error(function(data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        findByPseudo: function(pseudo) {
            var deferred = $q.defer();
            $http.get($rootScope.apiUrl+"user/", {
                params: {
                    pseudo: pseudo
                }
            })
                .success(function(data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    deferred.resolve(response);
                })
                .error(function(data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        }
    };
});
