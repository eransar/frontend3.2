angular.module("myApp")
    .controller("pointController", function ($scope,$http,$rootScope,$cookies) {

        // Get the modal
        $scope.fav_img = "star1.png";
        var tmpCategory = "";
        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        var points = localStorage.getItem("points");
        points =  JSON.parse(points);
        $scope.points_arr=[];

        $http({
            method : "GET",
            url : "http://localhost:3000/categories"
          }).then(function mySuccess(response) {
              $scope.categories = response.data;
              var a1 = {
                  id:"5",
                  category:"all"
              };
              $scope.categories.push(a1);
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
        });

        $scope.sort = function(){
            tmpCategory = $scope.container.category.category;
            $scope.points_arr=[];
            for (let index1 = 0; index1 < points.length; index1++) {
                if(points[index1].category == tmpCategory || tmpCategory =="all"){
                    var a = new Object();
                    a.name = points[index1].name;
                    a.picture = "http://127.0.0.1:3000/images/"+points[index1].picture;
                    a.id = index1;
                    $scope.points_arr.push(a);
                }
            } 
        }

        for (let index1 = 0; index1 < points.length; index1++) {
            var a = new Object();
            a.name = points[index1].name;
            a.picture = "http://127.0.0.1:3000/images/"+points[index1].picture;
            a.id = index1;
            $scope.points_arr.push(a);
        }

        $scope.idshow="";
        $scope.IsDisplay = false;
        $scope.showPoint="";
        $scope.pointInfo ="";
        $scope.recentReview = "";

        $scope.clickMe = function(clicked,event,poiName){
            var url1 = "http://localhost:3000/getPoints/"+poiName;
            $http({
                method : "GET",
                url : url1
              }).then(function mySuccess(response) {
                  $scope.categories = response.data;
                  var a1 = {
                      id:"5",
                      category:"all"
                  };
                  $scope.categories.push(a1);
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
            });
            if(modal.style.display = "none")
                modal.style.display = "block";
            else
                modal.style.display = "none";
            $scope.idshow = event.target.id;
            $scope.IsDisplay = clicked == true ? false : true;
            /* modal setting picture */
            for (let index = 0; index < ($scope.points_arr).length; index++) {
                    if($scope.points_arr[index].name == poiName){
                        $scope.showPoint = $scope.points_arr[index];
                        $scope.pointInfo = points[index];
                        $scope.recentReview = JSON.parse(points[index].recent_reviews);
                        var tmp = "";
                        for(let in1 = 0; in1 < ($scope.recentReview).length;in1++){
                            tmp = tmp + ($scope.recentReview)[in1].review + " " + ($scope.recentReview)[in1].date+"  " ;
                        } 
                        $scope.recentReview= tmp;
                    }
            }
        };

        $scope.sortByRank = function(){
            var p_arr =points;
            if(p_arr !=null && p_arr != ""){
                p_arr.sort((a, b) => b.total_rank - a.total_rank);
            }
            $scope.points_arr=[];
            for (let index1 = 0; index1 < p_arr.length; index1++) {
                if(tmpCategory == "" || points[index1].category == tmpCategory || tmpCategory =="all"){
                    var a = new Object();
                    a.name = points[index1].name;
                    a.picture = "http://127.0.0.1:3000/images/"+p_arr[index1].picture;
                    a.id = index1;
                    $scope.points_arr.push(a);
                }
            }            
        }

        $scope.saveReview = function(){
            if($rootScope.currentuser==="Guest"){
                alert("You have to be logged in to use this operation");
                return;
            }
            var rev = $scope.review_rank.reviewText;
            var rank = $scope.review_rank.rank_text;
            var token = $cookies.get($rootScope.currentuser.toString());
            $http({
                method : "PUT",
                url : "http://localhost:3000/writeReviewPointOfInterest/reviews",
                data: {
                        name: $scope.showPoint.name ,
                        review: rev,
                        rank: rank
                },
                headers: {
                    "Authorization":token,
                }
              }).then(function mySuccess(response) {
                // console.log(response.data);
                $scope.questions = response.data;
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
              });
              
        }

        $scope.imgStar = function(event){
            var token = $cookies.get($rootScope.currentuser.toString());
            var t_id = document.getElementById(event.target.id);
            if($scope.fav_img == "star1.png"){
                var t = "";
                t = document.getElementById(event.target.id).parentElement.childNodes[1].childNodes[0].data;
                var arr_poiint_to_send = new Array();
                arr_poiint_to_send.push(t);
            $http({
                method : "POST",
                url : "http://localhost:3000/saveArrOfPointOfInterest",
                data: {
                        username: $rootScope.currentuser.toString() ,
                        pointsNames: arr_poiint_to_send
                },
                headers: {
                    "Authorization":token,
                }
              }).then(function mySuccess(response) {
                $scope.fav_img = "star.png";
                t_id.setAttribute("src","images/"+$scope.fav_img);
                // console.log(response.data);
                $scope.questions = response.data;
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
              });
            }
            else{
                
                t = document.getElementById(event.target.id).parentElement.childNodes[1].childNodes[0].data;
                $http({
                    method : "DELETE",
                    url : "http://localhost:3000/deletePointOfInterest",
                    data: {
                            user_name: $rootScope.currentuser.toString() ,
                            point_name: t
                    },
                    headers: {
                        "Authorization":token,
                    }
                  }).then(function mySuccess(response) {
                    $scope.fav_img = "star1.png";
                    t_id.setAttribute("src","images/"+$scope.fav_img);
                    // console.log(response.data);
                    $scope.questions = response.data;
                    }, function myError(response) {
                      $scope.myWelcome = response.statusText;
                  });
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
        }
});
