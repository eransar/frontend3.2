// poi controller
angular.module("myApp")
.controller("registerController", function ($scope,$http) {
        $http({
                method : "GET",
                url : "http://localhost:3000/register"
              }).then(function mySuccess(response) {
                console.log(response.data);
                  $scope.myWelcome = response.data;
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
              });


//         $scope.submit = function(){
//         var email = function(){
            
//         }

//         var user = $scope.username;
//         if(/^[a-zA-Z]+$/.test(user)){
//                 console.log(user);
//         }
//         else{

//         }
//     }
});