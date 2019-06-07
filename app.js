let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            // this is a template
            template: '<h1>This is the default route</h1>'
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