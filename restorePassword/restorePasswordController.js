angular.module("myApp").service('restorePassword',function($http){



    this.userquestions = function() {
        var user = document.getElementById("username").value;

         return $http({
            method: "POST",
            url: "http://localhost:3000/questionsByUser",
            data: {
                username: user
            }
        }).then(function mySuccess(response) {

            var user_questions = response.data;
            return response;


        }, function myError(response) {
            // console.log(response.statusText);
            var loginerror = response.data;
            return response;
        }
        );

    };

    this.validateAnswers = function(username,question,answer) {



        return $http({
            method: "POST",
            url: "http://localhost:3000/RestorePassword",
            data: {
                username: username,
                securityQuestions: question,
                securityAnswers: answer
            }
        }).then(function mySuccess(response) {

                var user_questions = response.data;
                return response;


            }, function myError(response) {
                // console.log(response.statusText);
                var loginerror = response.data;
                return response;
            }
        );


        };


    this.showquestions = function(bool_question1,bool_question2){
        return bool_question1 || bool_question2;
    };



}).controller("restorePasswordController", function ($scope,$http,restorePassword,$location) {

    $scope.question1 = "";
    $scope.question2 = "";
    $scope.Isquestion1 = false;
    $scope.Isquestion2 = false;
    $scope.resultans=false;
    $scope.passwordresult="";

        $scope.isClicked = function(){

            return restorePassword.showquestions($scope.Isquestion1,$scope.Isquestion2);
            // return $scope.Isquestion1 || $scope.Isquestion2;
        };

        $scope.forgotClick = function() {
            // $scope.showquestions = restorePassword.userquestions();
            // $scope.showquestions.then(function() {
            //     var k=5;
            //
            // });

            restorePassword.userquestions()
                .then(function(res) {
                    $scope.result=res.data;
                    if($scope.result.length ==0){
                        alert("No such user. Please try again");
                        return;
                    }
                    var array =JSON.stringify($scope.result[0].securityQuestions).replace("{", "").replace("}", "").replace('"', "").replace('"', "").split(",");
                    switch(array.length){
                        case 1:
                            $scope.Isquestion1=true;
                            $scope.question1=array[0];
                            break;
                        case 2:
                            $scope.Isquestion1=true;
                            $scope.question1=array[0];
                           $scope.Isquestion2=true;
                            $scope.question2=array[1];
                            break;
                    }
                    //someone if request is success
                })
                .catch(function(rej) {
                    //someone if request is reject
                });

        };

        $scope.copyPassword = function(){
            const element = document.createElement('textarea');
            element.value = $scope.passwordresult.password.toString();
            // Add it to the document so that it can be focused.
            document.body.appendChild(element);
            // Focus on the element so that it can be copied.
            element.focus();
            element.setSelectionRange(0, element.value.length);
            // Execute the copy command.
            document.execCommand('copy');
            // Remove the element to keep the document clear.
            document.body.removeChild(element);
            $scope.Isquestion1=false;
            $scope.Isquestion2=false;
            alert("The password has been copied to your clipboard. you can now login from the homepage")
            $location.path('/');

        }




        // $scope.forgotClick = function () {
        //     var user = document.getElementById("username").value;
        //     $http({
        //         method: "POST",
        //         url: "http://localhost:3000/questionsByUser",
        //         data: {
        //             username: user
        //         }
        //     }).then(function mySuccess(response) {
        //
        //         $scope.user_questions = response.data;
        //         $scope.questions_data = JSON.stringify($scope.user_questions[0].securityQuestions).replace("{", "").replace("}", "").replace('"', "").replace('"', "").split(",");
        //         switch ($scope.questions_data.length) {
        //             case 1:
        //                 $scope.question1 = $scope.questions_data[0];
        //                 $scope.Isquestion1 = true;
        //                 break;
        //             case 2:
        //                 $scope.question1 = $scope.questions_data[0].toString();
        //                 $scope.Isquestion1 = true;
        //                 $scope.question2 = $scope.questions_data[1].toString();
        //                 $scope.Isquestion2 = true;
        //                 break;
        //         }
        //
        //     }, function myError(response) {
        //         // console.log(response.statusText);
        //         $scope.loginerror = response.data;
        //
        //
        //     });
        //
        // };


        $scope.validateClick=function(){
            $scope.username =document.getElementById("username").value;
            $scope.answer1=document.getElementById("answer1").value;
            $scope.answer2=document.getElementById("answer2").value;
            $scope.result=""

            if($scope.Isquestion1 && $scope.Isquestion2){
                var answers =$scope.answer1+","+$scope.answer2;
                var questions = $scope.question1+","+$scope.question2;
                restorePassword.validateAnswers($scope.username,questions,answers)
                    .then(function(res) {
                        $scope.result=res.data;
                        if($scope.result !== ""){
                            $scope.resultans=true;
                            $scope.passwordresult=$scope.result;
                        }
                        else {
                            alert("Your answers was not correct. Please try again");
                        }
                        //someone if request is success
                    })
                    .catch(function(rej) {
                        //someone if request is reject
                    });
            }
            else if($scope.Isquestion1){
                restorePassword.validateAnswers($scope.username,$scope.question1,$scope.answer1)
                    .then(function(res) {
                        $scope.result=res.data;
                        if($scope.result !== ""){
                            $scope.resultans=true;
                            $scope.passwordresult=$scope.result;
                        }
                        else{
                            alert("Your answer was not correct. Please try again");
                        }
                        //someone if request is success
                    })
                    .catch(function(rej) {
                        //someone if request is reject
                    });
            }






        };

    });