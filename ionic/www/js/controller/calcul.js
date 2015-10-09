/**
 * Created by najie on 30/09/15.
 */
app.controller('calculCtrl', function ($rootScope, $scope, $stateParams, $state, Friend) {
    $scope.result = "0";
    $scope.calculState = $stateParams.state;
    $scope.buttonLabel = 'Valider';

    $scope.$watch('friends', function (newVal, oldVal) {
        if(newVal.length > 0) {
            $scope.friend = $scope.friends[$stateParams.friendIndex];
            if($scope.calculState == 'refound' && $scope.friend.owe < 0) {
                $scope.result = $scope.friend.owe*-1+"";
                $scope.buttonLabel = 'Rembourser';
            }
            else if($scope.calculState == 'refound' && $scope.friend.owe >= 0)
                $scope.buttonLabel = 'Avancer';
        }
    });

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

    $scope.borrow = function () {
        Friend.updateDebt($scope.friend.friend.id, '-'+$scope.result).then(function(response) {
            $scope.friends[$stateParams.friendIndex].owe = response.data.owe;
            $state.go('home.index');
        });
    };

    $scope.refound = function () {
        Friend.updateDebt($scope.friend.friend.id, $scope.result).then(function(response) {
            $scope.friends[$stateParams.friendIndex].owe = response.data.owe;
            $state.go('home.index');
        });
    };

});
