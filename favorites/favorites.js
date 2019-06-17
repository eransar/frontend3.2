angular.module("myApp")
    .controller("favoritesController", function ($scope,$http,$cookies,$rootScope) {
        // Get the modal
        $scope.fav_img = "star1.png"
        var tmpCategory = "";
        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        var points = [];
        // var points = localStorage.getItem("points");
        // points =  JSON.parse(points);
        $scope.points_arr=[];
        var token_scope =$cookies.get($rootScope.currentuser);
        var i =5;

        //get categories
        $http({
            method : "GET",
            url : "http://localhost:3000/categories"
          }).then(function mySuccess(response) {
              $scope.categories = response.data;
              var a1 = {
                  id:"5",
                  category:"all"
              }
              $scope.categories.push(a1);
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
        });

        /** sorting categories */
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
        };

        $http({
            method : "GET",
            url : "http://localhost:3000/getInterest",
            data: {
                username:$rootScope.currentuser
            },
            headers: {
            "Authorization":token_scope
            }
          }).then(function mySuccess(response) {
              points = response.data;
              for (let index1 = 0; index1 < points.length; index1++) {
                var a = new Object();
                a.name = points[index1].name;
                a.picture = "http://127.0.0.1:3000/images/"+points[index1].picture;
                a.id = index1;
                $scope.points_arr.push(a);
        }
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
        });

        
        $scope.idshow="";
        $scope.IsDisplay = false;
        $scope.showPoint="";
        $scope.pointInfo ="";
        $scope.recentReview = "";
        $scope.clickMe = function(clicked,event,poiName){
            var url1 = "http://localhost:3000/getPoints/"+poiName;
            $http({
                method : "GET",
                url : url1,
                headers: {
                    "Authorization":token_scope,
                }
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
        $scope.saveReview = function(){
            var rev = $scope.review_rank.reviewText;
            var rank = $scope.review_rank.rank_text;
            $http({
                method : "PUT",
                url : "http://localhost:3000/writeReviewPointOfInterest/reviews",
                headers: {
                    "Authorization":token_scope,
                }
              }).then(function mySuccess(response) {
                // console.log(response.data);
                $scope.questions = response.data;
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
              });
              
        };

        $scope.sortByRank = function(){
            var p_arr = points;
            if(p_arr !=null && p_arr != ""){
                p_arr.sort((a, b) => b.total_rank - a.total_rank);
            }
            $scope.points_arr=[];
            for (let index1 = 0; index1 < p_arr.length; index1++) {
                    var a = new Object();
                    a.name = points[index1].name;
                    a.picture = "http://127.0.0.1:3000/images/"+p_arr[index1].picture;
                    a.id = index1;
                    $scope.points_arr.push(a);
                
            }            
        }

        $scope.imgStar = function(event){
            var t = document.getElementById(event.target.id).parentElement.childNodes[1].childNodes[0].data;
            // $http({
            //     method : "DELETE",
            //     url : "http://localhost:3000/deletePointOfInterest",
            //     data: {
            //             user_name : $rootScope.currentuser,
            //             point_name : t
            //     },
            //     headers: {
            //         'Content-Type':"application/json",
            //         "Authorization":token_scope,
            //     }
            //   }).then(function mySuccess(response) {
            //     // console.log(response.data);
            //     $scope.questions = response.data;
            //     }, function myError(response) {
            //       $scope.myWelcome = response.statusText;
            //   });
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
});
