angular.module("myApp").controller("homeController", function ($scope,$http,$location,$cookies,$rootScope, $sce) {


        $scope.loginClick = function(){
            var username1=document.getElementById("user_box").value;
            var password1=document.getElementById("passwd_box").value;
            var date= new Date();
            var time = date.setDate(date.getDate() + 1);

            if(username1==="" || password1===""){
                return;
            }
            logindata = {
                username : username1,
                password : password1
            };
            var usertoken;
            try{
                 usertoken = $cookies.get('token');
            }
            catch (e) {

            }


            if(usertoken !=null){
                $http({
                    method : "POST",
                    url : "http://localhost:3000/login",
                    data : logindata,
                    headers: {
                        'Authorization': usertoken
                    },
                }).then(function mySuccess(response) {

                    $scope.token = response.data;
                    $rootScope.currentuser=username1;
                    $scope.trusteduser = $sce.trustAsHtml($scope.currentuser);
                    $location.path('/login');
                }, function myError(response) {
                    $scope.loginerror = response.data;
                    alert($scope.loginerror);
                });
            }
            else {
                $http({
                    method : "POST",
                    url : "http://localhost:3000/login",
                    data : logindata
                }).then(function mySuccess(response) {

                    $scope.token = response.data;
                    $cookies.put('token',$scope.token,{'time':date});
                    $rootScope.currentuser=username1;
                    $scope.trusteduser = $sce.trustAsHtml($scope.currentuser);
                    $location.path('/login');
                }, function myError(response) {
                    // console.log(response.statusText);
                    $scope.loginerror = response.data;
                    alert($scope.loginerror);


                });
            }


        };

});

