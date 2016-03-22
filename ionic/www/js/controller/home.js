/**
 * Created by najie on 30/09/15.
 */
/**
 * Created by najie on 30/09/15.
 */
app.controller('homeCtrl', function ($rootScope, $scope, $state, $mdSidenav, $mdUtil, Friend) {
    $scope.friendIds = [];
    $scope.$watch('user', function (newVal, oldVal) {
        if(newVal) {
            Friend.find().then(function (response) {
                $scope.friends = response.data;
                response.data.forEach(function (friend) {
                    $scope.friendIds.push(friend.friend.id);
                });
            });
        }
    });

    $scope.acceptFriendRequest = function (fromId) {
        Friend.acceptFriendRequest(fromId).then(function (response) {
            Friend.find().then(function (response) {
                $scope.friends = response.data;
            });
        });
    };
    $scope.hideFriendRequest = function (fromId) {

    };
});
