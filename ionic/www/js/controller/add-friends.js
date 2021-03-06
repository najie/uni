/**
 * Created by najie on 30/09/15.
 */
app.controller('addFriendsCtrl', function ($rootScope, $scope, $state, User, Friend) {
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
        Friend.sendFriendRequest(friendId).then(function (response) {
            $scope.searchResult = [];
            $scope.searchPseudo = null;
            $scope.searching = false;
            Friend.find().then(function (response) {
                $scope.friends = response.data;
            });
        });
    };

    $scope.checkAddBtn = function (userSearchId) {
        var found = false;
        $scope.friends.forEach(function (friend) {
            console.log(friend);
            if(friend.friend.id == userSearchId)
                found = true;
        });
        console.log(found);
        return found;
    };
});
