/**
 * Created by najie on 30/09/15.
 */
/**
 * Created by najie on 30/09/15.
 */
app.controller('homeCtrl', function ($rootScope, $scope, $state, $mdSidenav, $mdUtil, Friend, FriendRequest) {

    $scope.toolbarPrevious = function() {
        console.log('toolbar prev');
        $state.go('home.index');
    };

    $scope.showSidebar = buildToggler('left');
    $scope.hideSidebar = function () {
        $mdSidenav('left').close()
            .then(function () {
            });
    };
    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                });
        },100);
        return debounceFn;
    }

    $scope.friendIds = [];
    $scope.friends = [];
    $scope.requestSent = [];
    $scope.requestReceive = [];
    $scope.requestSentIds = [];
    $scope.requestReceiveIds = [];
    $scope.$watch('user', function (newVal, oldVal) {
        if(newVal) {
            Friend.find().then(function (response) {
                $scope.friends = response.data;
                response.data.forEach(function (friend) {
                    $scope.friendIds.push(friend.friend.id);
                });
            });

            FriendRequest.findSent().then(function (response) {
                $scope.requestSent = response.data;
                response.data.forEach(function (request) {
                    $scope.requestSentIds.push(request.to.id);
                });
            });
            FriendRequest.findReceive().then(function (response) {
                $scope.requestReceive = response.data;
                response.data.forEach(function (request) {
                    $scope.requestReceiveIds.push(request.from.id);
                });
            });

        }
    });

    $scope.accepteRequest = function (fromId) {
        Friend.add(fromId).then(function (response) {
            Friend.find().then(function (response) {
                $scope.friends = response.data;
            });
            FriendRequest.findReceive().then(function (response) {
                $scope.requestReceive = response.data;
            })
        })
    };

    $scope.disconnect = function () {
        delete window.localStorage['session'];
        $state.go('login');
    };
});
