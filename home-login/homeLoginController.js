angular.module("myApp")
    .controller("homeLoginController", function ($rootScope,$http,$scope,$cookies) {
        // $rootScope.$digest();
        $scope.popular_image1="";
        $scope.popular_image2="";
        $scope.interest_image1="";
        $scope.interest_image2="";
        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        $scope.idshow="";
        $scope.IsDisplay = false;
        $scope.showPoint="";
        $scope.pointInfo ="";
        $scope.recentReview = "";
        var dict = new Object();
        var token = $cookies.get($rootScope.currentuser);
        // getPopularPointsOfInterest();
        $http({
            method : "GET",
            headers: {
                'Authorization': token
            },
            url : "http://localhost:3000/getPopularPointsOfInterest"

        }).then(function mySuccess(response) {
            $scope.images = response.data;
            $scope.popular_image1="http://127.0.0.1:3000/images/"+$scope.images[0].picture;
            $scope.popular_image2="http://127.0.0.1:3000/images/"+$scope.images[1].picture;

            dict["img1"] = $scope.images[0];
            dict["img2"] = $scope.images[1];
            // $scope.image1="http://127.0.0.1:3000/images/"+$scope.images[0].picture;
            // $scope.image2="http://127.0.0.1:3000/images/"+$scope.images[1].picture;
            // $scope.image3="http://127.0.0.1:3000/images/"+$scope.images[2].picture;
            // dict["img1"] = $scope.images[0];
            // dict["img2"] = $scope.images[1];
            // dict["img3"] = $scope.images[2];
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
        //getrecentpointsofintrests

        $http({
            method : "GET",
            headers: {
                'Authorization': token
            },
            url : "http://localhost:3000/getRecentSavedPointsOfInterest"

        }).then(function mySuccess(response) {
            $scope.images = response.data;
            try{


                switch($scope.images.length){
                    case 0:
                        $scope.interest_image1="images/notfound.png";
                        break;
                    case 1:
                        $scope.interest_image1="http://127.0.0.1:3000/images/"+$scope.images[0].picture;
                        $scope.interest_image2="images/notfound.png";

                        break;
                    case 2:
                        $scope.interest_image1="http://127.0.0.1:3000/images/"+$scope.images[0].picture;
                        $scope.interest_image2="http://127.0.0.1:3000/images/"+$scope.images[1].picture;

                        break;
                }

                dict["img3"] = $scope.images[0];
                dict["img4"] = $scope.images[1];
            }
            catch(e){
                if($scope.interest_image1!=null){
                    $scope.interest_image2="images/notfound.png";
                }
                // $scope.interest_image1="images/notfound.png";

            }

            // $scope.image1="http://127.0.0.1:3000/images/"+$scope.images[0].picture;
            // $scope.image2="http://127.0.0.1:3000/images/"+$scope.images[1].picture;
            // $scope.image3="http://127.0.0.1:3000/images/"+$scope.images[2].picture;
            // dict["img1"] = $scope.images[0];
            // dict["img2"] = $scope.images[1];
            // dict["img3"] = $scope.images[2];
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });

        var int =5;


        $scope.clickMe = function(clicked,event){
            var id_of_image = event.target.id;
            var img_show = dict[id_of_image];
            if(modal.style.display = "none")
                modal.style.display = "block";
            else
                modal.style.display = "none";
            $scope.IsDisplay = clicked == true ? false : true;
            $scope.showPoint = "http://127.0.0.1:3000/images/"+dict[id_of_image].picture;
            $scope.pointInfo = dict[id_of_image];
            $scope.recentReview = JSON.parse(dict[id_of_image].recent_reviews);
            var tmp = "";
            if($scope.recentReview !=null){
                for(let in1 = 0; in1 < ($scope.recentReview).length;in1++){
                    tmp = tmp + ($scope.recentReview)[in1].review + " " + ($scope.recentReview)[in1].date+"  " ;
                }
                $scope.recentReview= tmp;
            }
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        span.onclick = function() {
            modal.style.display = "none";
        };

        // $scope.myFunction = function(event) {
        //     event.src = "/images/icon.png";
        //     event.onerror = '';
        // };



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