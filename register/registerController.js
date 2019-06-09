// poi controller
angular.module("myApp")
.controller("registerController", function ($scope,$http) { 
  /* categories req */
    $http({
        method : "GET",
        url : "http://localhost:3000/categories"
      }).then(function mySuccess(response) {
          $scope.categories = response.data;
        }, function myError(response) {
          $scope.myWelcome = response.statusText;
    });
    /* countries req */
    $http({
      method : "GET",
      url : "http://localhost:3000/countries"
    }).then(function mySuccess(response) {
      $scope.countries = response.data;
      }, function myError(response) {
        $scope.myWelcome = response.statusText;
  });
  /* countries req */
  $http({
    method : "GET",
    url : "http://localhost:3000/questions"
  }).then(function mySuccess(response) {
    console.log(response.data);
    $scope.questions = response.data;
    }, function myError(response) {
      $scope.myWelcome = response.statusText;
});
    var data;
    $scope.submitClick = function(){
      console.log("dd");
      data = {
        user: $scope.container.user,
        email:$scope.container.email,
        password:$scope.container.password,
        firstname:$scope.container.firstname,
        lastname:$scope.container.lastname,
        city:$scope.container.city,
        country:$scope.container.country,
        categories:$scope.container.categories,
        securityQuestions:$scope.container.securityQuestions,
        securityAnswers:$scope.container.securityAnswers
      }
      console.log(data);
    }
        // $http({
        //         method : "POST",
        //         url : "http://localhost:3000/register"
        //         // data:
        //       }).then(function mySuccess(response) {
        //         console.log(response.data);
        //           $scope.myWelcome = response.data;
        //         }, function myError(response) {
        //           $scope.myWelcome = response.statusText;
        //       });


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
