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
    var securityQuestions = [$scope.container.questions1.question , $scope.container.questions2.question];
    var securityAnswers = [$scope.container.answer1 , $scope.container.answer2];
    data1 = {
      username: $scope.container.user,
      email:$scope.container.email,
      password:$scope.container.password,
      city:"",
      firstname:$scope.container.firstName,
      lastname:$scope.container.lastName,
      country:$scope.container.country,
      categories:$scope.container.category.category,
      securityQuestions:securityQuestions,
      securityAnswers:securityAnswers
    }
    console.log(data1);
    $http({
                method : "POST",
                url : "http://localhost:3000/register",
                data : data1  
              }).then(function mySuccess(response) {
                console.log(response.data);
                  $scope.myWelcome = response.data;
                }, function myError(response) {
                  console.log(response.statusText);
                  $scope.myWelcome = response.statusText;
              });
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
