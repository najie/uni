/**
 * Created by najie on 30/09/15.
 */
app.controller('registerCtrl', function ($rootScope, $scope, $state, User) {
    $scope.error = {
        passwordNotEqual: false,
        pseudoAlreadyTaken: false
    };
    $scope.register = {
        pseudo: null,
        password: null,
        password2: null
    };
    $scope.$watch('register.password2', function(newVal,oldVal) {
        if($scope.register.password !== newVal) {
            $scope.error.passwordNotEqual = true;
        }
        else {
            $scope.error.passwordNotEqual = false;
        }
    });
    $scope.submit = function () {
        if($scope.register.password !== $scope.register.password2) return;
        User.register($scope.register.pseudo, $scope.register.password).then(function(response) {
            if(response.status == 'success') {
                window.localStorage['session'] = response.data.id;
                User.findOne(response.data.id).then(function(response) {
                    console.log(response);
                    if(response.status == 'success') {
                        $rootScope.user = response.data;
                        $state.go('home');
                    }
                });
            }
            else {
                if(response.error && response.invalidAttributes.pseudo[0].rule == 'unique') {
                    $scope.error.pseudoAlreadyTaken = true;
                }
            }
        });
    };
});
