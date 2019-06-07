var app = angular.module('myApp', ["ngRoute"]);

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
            templateUrl: 'pages/poi/POI_Details.html',
            controller : 'poiController as POI_DetailsCtrl'
        })
        // register
        .when('/register', {
            templateUrl: 'register/register.html',
            controller : 'registerController as regCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});