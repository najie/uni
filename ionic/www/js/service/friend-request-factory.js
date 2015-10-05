/**
 * Created by najie on 30/09/15.
 */
app.factory('FriendRequest', function($rootScope, $q, $http) {
    return {
        create: function (from, to) {
            var deferred = $q.defer();
            $http.post($rootScope.apiUrl + "/friendRequest/", {
                from: from,
                to: to
            })
                .success(function (data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('Create Friend Request', response);
                    deferred.resolve(response);
                })
                .error(function (data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        findSent: function () {
            var deferred = $q.defer();
            $http.get($rootScope.apiUrl + "/friendRequest/", {
                params: {
                    from: $rootScope.user.id,
                    status: 'pending'
                }
            })
                .success(function (data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('Friend Request Sent', response);
                    deferred.resolve(response);
                })
                .error(function (data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        findReceive: function () {
            var deferred = $q.defer();
            $http.get($rootScope.apiUrl + "/friendRequest/", {
                params: {
                    to: $rootScope.user.id,
                    status: 'pending'
                }
            })
                .success(function (data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('Friend Request Receive', response);
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
