var app = angular.module('myApp', ["ngRoute"]);
var users_dic = "" ;



// config routes
app.config(function($routeProvider)  {
    "use strict";
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
            templateUrl: 'about/about.html',
            controller : 'aboutController as abtCtrl',
            css: 'about/about.css'
        })
        // poi
        .when('/search', {
            templateUrl: 'search/search.html',
            controller : 'searchController as searchCtrl',
            css: 'search/search.css'
        })
        // register
        .when('/register', {
            templateUrl: 'register/register.html',
            controller : 'registerController as regCtrl',
            css: 'register/register.css'
        })
        .when('/points', {
            templateUrl: 'points/point.html',
            controller : 'pointController as pointCtrl',
            css: 'points/point.css'
        })
        .when('/favorites', {
            templateUrl: 'favorites/favorites.html',
            controller : 'favoritesController as fevCtrl',
            css: 'favorites/favorites.css'
        })
        // other
        .otherwise({ redirectTo: '/' });
});

app.controller("H_controller", function ($http) {
    "use strict";
    $http({
        method : "GET",
        url : "http://localhost:3000/points"
      }).then(function mySuccess(response) {
          users_dic =  response.data;
          localStorage.setItem('points', JSON.stringify(users_dic));
        }, function myError(response) {
          users_dic =  response.statusText;
    });
    
});