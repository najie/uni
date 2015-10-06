/**
 * Created by najie on 30/09/15.
 */
app.factory('Friend', function($rootScope, $q, $http) {
    return {
        acceptFriendRequest: function(friendId) {
            var deferred = $q.defer();
            $http.put($rootScope.apiUrl+"/friend/", {
                user1: friendId,
                user2: $rootScope.user.id
            })
                .success(function(data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('Accept friend request', response);
                    deferred.resolve(response);
                })
                .error(function(data) {
                    data.status = 'error';
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        sendFriendRequest: function(user2Id) {
            var deferred = $q.defer();
            $http.post($rootScope.apiUrl+"/friend/", {
                user1: $rootScope.user.id,
                user2: user2Id
            })
                .success(function(data) {
                    var response = {
                        status: 'success',
                        data: data
                    };
                    console.log('Send friend request', response);
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
                    where: {
                        or: [
                            {user1: $rootScope.user.id},
                            {user2: $rootScope.user.id}
                        ]
                    }
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
        borrow: function (friendId, borrow) {
            var deferred = $q.defer();
            $http.post($rootScope.apiUrl + "/friend/borrow", {
                friendId: friendId,
                userId: $rootScope.user.id,
                borrow: borrow
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
