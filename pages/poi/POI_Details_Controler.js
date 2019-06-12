
angular.module('myApp', ["ngRoute"])

.controller('POI_DetailsCtrl','$scope','$http', function($scope, $http) {
    "use strict";
    var name = "The Western Wall";
    $http({    
    method : "GET",     
    url : "http://localhost:3000/getPoints",
    headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImVyYW4iLCJpYXQiOjE1NTkwNDI3NzEsImV4cCI6MTU5MDU3ODc3MX0.0aJFRZO8OjO32FJ-JpIsmHz_QAbG0TOyZSt4Jm9c9Cc"
    },
    data: { name: name}
    })
    .then(function mySuccess(response) {
        $scope.point = response.data;
        }, 
        function myError(response) {   
        $scope.myWelcome = response.error; 
    });

});