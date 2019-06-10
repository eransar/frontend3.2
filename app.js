let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            templateUrl: 'home/home.html',
            controller : 'homeController as homeCtrl',
            css: 'home/home.css'
        })
        .when('/login', {
            templateUrl: 'home-login/home_login.html',
            controller : 'homeLoginController as homeLoginCtrl',
            css: 'home-login/home_login.css'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        // register
        .when('/register', {
            templateUrl: 'register/register.html',
            controller : 'registerController as regCtrl',
            css: 'register/register.css'
        })
        // other
        .otherwise({ redirectTo: '/' });
});