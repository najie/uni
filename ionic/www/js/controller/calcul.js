/**
 * Created by najie on 30/09/15.
 */
app.controller('calculCtrl', function ($rootScope, $scope, $stateParams, $state, Friend) {
    $scope.result = 0;
    $scope.state = $stateParams.state;

    $scope.$watch('friends', function (newVal, oldVal) {
        if(newVal) {
            $scope.friend = $scope.friends[$stateParams.friendIndex];
        }
    });

    $scope.calculate = function (val) {
        var strResult = $scope.result+"";

        if(strResult.split(',')[1] && strResult.split(',')[1].length >= 2) {
            return;
        }
        console.log(strResult, strResult.search(','));
        if(val == ',' && (strResult.search(',') !== -1 || strResult == 0)) {
            return;
        }
        else {
            $scope.result += ',';
        }

        if(strResult == 0)
            strResult = val;
        else
            strResult += val+"";


        if(strResult >= 9999) {
            strResult = 9999;
        }

        //strResult = strResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        $scope.result = strResult;
    };

    $scope.borrow = function () {
        Friend.borrow($scope.friend.friend.id, $scope.result).then(function(response) {
            console.log($scope.friends[$stateParams.friendIndex].owe, response.data.friend.owe);
            $scope.friends[$stateParams.friendIndex].owe = response.data.friend.owe;
            console.log(response);
        });
    };

});
