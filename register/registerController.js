// poi controller
angular.module("myApp").controller("registerController", function ($scope,$http, $location) {
  /* categories req */
  "use strict";
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
    // console.log(response.data);
    $scope.questions = response.data;
    }, function myError(response) {
      $scope.myWelcome = response.statusText;
  });
  
  var data1;
  $scope.submitClick = function(){
    var tmp =[];
    for (var index = 0; index < ($scope.container.category).length; index++) {
      tmp.push(($scope.container.category)[index].category);
    }
    tmp = JSON.stringify(tmp);
    var securityQuestions = [$scope.container.questions1.question , $scope.container.questions2.question];
    var securityAnswers = [$scope.container.answer1 , $scope.container.answer2];
    data1 = {
      username: $scope.container.user,
      email:$scope.container.email,
      password:$scope.container.password,
      firstname:$scope.container.firstName,
      lastname:$scope.container.lastName,
      country:$scope.container.country,
      city:$scope.container.city,
      categories:tmp,
      securityQuestions:securityQuestions,
      securityAnswers:securityAnswers
    };
    $http({
            method : "POST",
            url : "http://localhost:3000/register",
            data : data1  
          }).then(function mySuccess(response) {
            // console.log(response.data);
              $scope.myWelcome = response.data;
              $location.path('/home');
            }, function myError(response) {
              // console.log(response.statusText);
              $scope.myWelcome = response.data;
              alert($scope.myWelcome);

          });
  };

});
