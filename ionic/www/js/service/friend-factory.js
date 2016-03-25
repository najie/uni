/**
 * Created by najie on 30/09/15.
 */
app.factory('Friend', function($rootScope, $q, $http) {
    return {
        friends: [],
        acceptFriendRequest: function(friendId) {
            var deferred = $q.defer();
            $http.put($rootScope.apiUrl+"friend/"+friendId, {
                status: 1
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
            $http.post($rootScope.apiUrl+"friend/", {
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
        find: function(userId) {
            var deferred = $q.defer();
            $http.get($rootScope.apiUrl + "friend/", {
                params: {
                    userId: userId
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
        updateDebt: function (friendId, val) {
            var deferred = $q.defer();
            $http.post($rootScope.apiUrl + "friend/updateDebt", {
                friendId: friendId,
                userId: $rootScope.user.id,
                val: val
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
