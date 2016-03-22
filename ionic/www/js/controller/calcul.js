/**
 * Created by najie on 30/09/15.
 */
app.controller('calculCtrl', function ($rootScope, $scope, $stateParams, $state, Friend) {
    $scope.result = "0";
    $scope.calculState = $stateParams.state;

    if($scope.calculState == 'borrow') {
        $scope.buttonLabel = 'Emprunter';
    }

    $scope.calculate = function (val) {
        var floatResult = parseFloat($scope.result.replace(',', '.')),
            decimal = false;

        if($scope.result.search(',') !== -1) {
            decimal = true;
            if($scope.result.split(',')[1].length === 2)
                return;
        }

        if(val === ',') {
            if(floatResult === 0) {
                $scope.result = '0,';
            }
            else {
                $scope.result += ',';
            }
        }else {
            if(floatResult === 0 && !decimal) {
                $scope.result = val+"";
            }
            else {
                $scope.result += val+"";
            }
        }

        if(floatResult >= 999) {
            $scope.result = "9999";
        }
    };

    $scope.confirm = function () {
        if($scope.calculState == 'refound') {
            Friend.updateDebt($scope.friend.friend.id, $scope.result).then(function(response) {
                $scope.friends[$stateParams.friendIndex].owe = response.data.owe;
                $state.go('app.home');
            });
        }
        else {
            Friend.updateDebt($scope.friend.friend.id, '-'+$scope.result).then(function(response) {
                $scope.friends[$stateParams.friendIndex].owe = response.data.owe;
                $state.go('app.home');
            });
        }
    }
});
