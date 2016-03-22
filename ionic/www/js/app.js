// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', [
    'ionic',
    'ngMaterial',
    'ui.router',
    'ngMessages'
]);

app.run(function ($rootScope, $ionicPlatform, $state, $location, User, $mdSidenav, $mdUtil) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.showSidebar = buildToggler('left');
        $rootScope.hideSidebar = function () {
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

        $rootScope.disconnect = function () {
            delete window.localStorage['session'];
            $state.go('login');
        };
        $rootScope.toolbarPrevious = function() {
            $state.go('app.home');
        };

    });

    switch ($location.host()) {
        case 'localhost':
            $rootScope.baseUrl = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/uni";
            $rootScope.mobileUrl = $rootScope.baseUrl+"/ionic/www";
            $rootScope.apiUrl = 'http://localhost:1337';
            break;
        default:
            $rootScope.baseUrl = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/uni";
            $rootScope.mobileUrl = $rootScope.baseUrl+"/ionic/www";
            $rootScope.apiUrl = 'http://localhost:1337';
            break;
    }

    $rootScope.$on("$stateChangeStart", function(event, toState, from) {
        console.log(toState.name);
        $rootScope.state = toState.name;
        $rootScope.previousState = from.name;
    });

    $rootScope.user = null;
    $rootScope.friends = [];
    $rootScope.session = window.localStorage['session'];
    if($rootScope.session) {
        User.findOne($rootScope.session).then(function(response) {
            if(response.status == 'success') {
                $rootScope.user = response.data;
                if($rootScope.state == 'login' || $rootScope.state == 'register')
                    $state.go('app.home');
            }
            else {
                delete window.localStorage['session'];
            }
        });
    }
});

app.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('login', {
                url: "/",
                templateUrl: "partials/login.html",
                controller: 'loginCtrl'
            })
            .state('register', {
                url: "/register",
                templateUrl: "partials/register.html",
                controller: 'registerCtrl'
            })
            .state('app', {
                url:'/app',
                templateUrl: 'partials/app.html',
                controller: 'homeCtrl'
            })
            .state('app.home', {
                url:'/home',
                templateUrl: 'partials/home.html',
            }).state('app.addFriends', {
                url:'/add-friends',
                templateUrl: 'partials/add-friends.html',
                controller: 'addFriendsCtrl'
            }).state('app.calcul', {
                url:'/calcul/:friendIndex?state',
                templateUrl: 'partials/calcul.html',
                controller: 'calculCtrl'
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('lime');

        $locationProvider.hashPrefix('!');
    }
]);
