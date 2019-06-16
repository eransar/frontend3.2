angular.module("myApp").controller("homeController", function ($scope,$http,$location,$cookies,$rootScope, $sce) {


    var images;
    $scope.images="";
    $scope.image1="";
    $scope.image2="";
    $scope.image3="";
    $scope.point1="";
    $scope.point2="";
    $scope.point3="";
    //getting pictures
    $http({
        method : "GET",
        url : "http://localhost:3000/getRandomPointsOfInterest"
    }).then(function mySuccess(response) {
        $scope.images = response.data;
        $scope.image1="http://127.0.0.1:3000/images/"+$scope.images[0].picture;
        $scope.image2="http://127.0.0.1:3000/images/"+$scope.images[1].picture;
        $scope.image3="http://127.0.0.1:3000/images/"+$scope.images[2].picture;

    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });





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
                 usertoken = $cookies.get(username1);
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
                    if($scope.loginerror == null){
                        alert("Server is not responding")
                    }
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
                    $rootScope.currentuser=username1;
                    $cookies.put($rootScope.currentuser.toString(),$scope.token,{'time':date});
                    $scope.trusteduser = $sce.trustAsHtml($scope.currentuser);
                    $location.path('/login');
                }, function myError(response) {
                    // console.log(response.statusText);
                    $scope.loginerror = response.data;
                    alert($scope.loginerror);


                });
            }


        };


    var k = 5;

});

