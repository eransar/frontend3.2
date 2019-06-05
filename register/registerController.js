// poi controller
angular.module("myApp")
.controller("registerController", function ($scope) {
        $scope.submit = function(){
        var user = $scope.username;
        if(/^[a-zA-Z]+$/.test(user)){
                console.log(user);
        }
        else{

        }
    }
});