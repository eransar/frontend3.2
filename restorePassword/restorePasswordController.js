angular.module("myApp")
    .controller("restorePasswordController", function ($scope,$http) {

        $scope.question1 = "";
        $scope.question2 = "";
        $scope.Isquestion1 = false;
        $scope.Isquestion2 = false;

        $scope.isClicked = function(){
            return $scope.Isquestion1 || $scope.Isquestion2;
        }

        $scope.forgotClick = function () {
            var user = document.getElementById("username").value;
            $http({
                method: "POST",
                url: "http://localhost:3000/questionsByUser",
                data: {
                    username: user
                }
            }).then(function mySuccess(response) {

                $scope.user_questions = response.data;
                $scope.questions_data = JSON.stringify($scope.user_questions[0].securityQuestions).replace("{", "").replace("}", "").replace('"', "").replace('"', "").split(",");
                switch ($scope.questions_data.length) {
                    case 1:
                        $scope.question1 = $scope.questions_data[0];
                        $scope.Isquestion1 = true;
                        break;
                    case 2:
                        $scope.question1 = $scope.questions_data[0].toString();
                        $scope.Isquestion1 = true;
                        $scope.question2 = $scope.questions_data[1].toString();
                        $scope.Isquestion2 = true;
                        break;
                }

            }, function myError(response) {
                // console.log(response.statusText);
                $scope.loginerror = response.data;


            });

        };

    });