/**
 * Created by najie on 30/09/15.
 */
app.controller('loginCtrl', function ($rootScope, $scope, $state, User) {
    $scope.login = {
        pseudo: null,
        password: null
    };

    if(window.localStorage['session']) {
        console.log('login -> home');
        $state.go('app.home');
    }


    $scope.submit = function () {
        $scope.error = {
            badPassword: false,
            badPseudo: false
        };

        User.login($scope.login.pseudo, $scope.login.password).then(function(response) {
            console.log('login', response);
            if(response.status == 'error') {
                if(response.error == 'Mauvais password')
                    $scope.error.badPassword = true;
                else if(response.error = 'Mauvaise pseudo')
                    $scope.error.badPseudo = true;
            }
            if(response.status == 'success') {
                window.localStorage['session'] = response.data.id;
                $rootScope.user = response.data;
                $state.go('app.home');
            }
        });
    };
});
