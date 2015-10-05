/**
 * Created by najie on 30/09/15.
 */
app.factory('Friend', function($rootScope, $q, $http) {
    return {
        add: function(friendId) {
            var deferred = $q.defer();
            $http.post($rootScope.apiUrl+"/friend/createExtend", {
                user: $rootScope.user.id,
                friend: friendId
            })
                .success(function(data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('Add friend', response);
                    deferred.resolve(response);
                })
                .error(function(data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        find: function() {
            var deferred = $q.defer();
            $http.get($rootScope.apiUrl + "/friend/", {
                params: {
                    user: $rootScope.user.id
                }
            })
                .success(function (data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('Friends', response);
                    deferred.resolve(response);
                })
                .error(function (data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        updateDebt: function (friendId, debt) {
            var deferred = $q.defer();
            $http.put($rootScope.apiUrl + "/friend/"+friendI, {
                owe: debt
            })
                .success(function (data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('Friends', response);
                    deferred.resolve(response);
                })
                .error(function (data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        }
    };
});
