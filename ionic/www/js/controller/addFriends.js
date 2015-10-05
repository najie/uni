/**
 * Created by najie on 30/09/15.
 */
app.controller('addFriendsCtrl', function ($rootScope, $scope, $state, User, Friend, FriendRequest) {
    $scope.searchPseudo = null;
    $scope.searchResult = [];
    $scope.searching = false;

    $scope.search = function() {
        $scope.searching = true;
        User.findByPseudo($scope.searchPseudo).then(function (response) {
            $scope.searchResult = response.data;
        });
    };

    $scope.addFriend = function(friendId) {
        FriendRequest.create($rootScope.user.id, friendId).then(function (response) {
            console.log(response);
            $scope.searchResult = [];
            $scope.searchPseudo = null;
            $scope.searching = false;
            FriendRequest.findSent($rootScope.user.id).then(function (response) {
                $scope.requestSent = response.data;
                $scope.requestSentIds = [];
                response.data.forEach(function (request) {
                    $scope.requestSentIds.push(request.to.id);
                });
            });
        });
    };

    $scope.checkAddBtn = function (userSearchId) {
        var found = false;
        $scope.requestSent.forEach(function (request) {
            if(request.to.id == userSearchId) {
                found = true;
            }
        });
        $scope.friends.forEach(function (friend) {
            if(friend.friend.id == userSearchId)
                found = true;
        });
        console.log(found);
        return found;
    };
});
