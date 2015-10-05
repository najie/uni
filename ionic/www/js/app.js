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

app.run(function ($rootScope, $ionicPlatform, $state, $location, User) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.baseUrl = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/uni";
    $rootScope.mobileUrl = $rootScope.baseUrl+"/ionic/www";
    $rootScope.apiUrl = 'http://localhost:1337';

    $rootScope.$on("$stateChangeStart", function(event, toState, from) {
        console.log(toState.name);
        $rootScope.state = toState.name;
        $rootScope.previousState = from.name;
    });

    $rootScope.user = null;
    $rootScope.session = window.localStorage['session'];
    if($rootScope.session) {
        User.findOne($rootScope.session).then(function(response) {
            if(response.status == 'success') {
                $rootScope.user = response.data;
                if($rootScope.state == 'login' || $rootScope.state == 'register')
                    $state.go('home.index');
            }
            else {
                window.localStorage['session'] = null;
            }
        });
    }
});

app.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('register', {
                url: "/register",
                templateUrl: "partials/register.html",
                controller: 'registerCtrl'
            })
            .state('login', {
                url: "/",
                templateUrl: "partials/login.html",
                controller: 'loginCtrl'
            })
            .state('home', {
                url:'/uni',
                templateUrl: 'partials/home.html',
                controller: 'homeCtrl'
            }).state('home.index', {
                url:'/index',
                templateUrl: 'partials/home-index.html'
            }).state('home.addFriends', {
                url:'/add-friends',
                templateUrl: 'partials/add-friends.html',
                controller: 'addFriendsCtrl'
            }).state('home.calcul', {
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
