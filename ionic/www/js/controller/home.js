/**
 * Created by najie on 30/09/15.
 */
/**
 * Created by najie on 30/09/15.
 */
app.controller('homeCtrl', function ($rootScope, $scope, $state, Friend, friends, user) {
    $scope.friendIds = [];

    if (user) {
        $rootScope.user = user.data;
        $rootScope.friends = friends.data;
    }
    else
        $state.go('login');

    $scope.acceptFriendRequest = acceptFriendRequest;
    $scope.hideFriendRequest = hideFriendRequest;
    $scope.doRefresh = doRefresh;

    function doRefresh() {
        Friend.find($rootScope.user.id).then(function (friends) {
            $rootScope.friends = friends.data;
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    function acceptFriendRequest(fromId) {
        Friend.acceptFriendRequest(fromId).then(function (response) {
            Friend.find().then(function (response) {
                $scope.friends = response.data;
            });
        });
    }

    function hideFriendRequest(fromId) {

    }
});
