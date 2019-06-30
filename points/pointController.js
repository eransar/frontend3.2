angular.module("myApp")
    .controller("pointController", function ($scope,$http,$rootScope,$cookies) {

        // Get the modal
        $scope.fav_img = "star1.png";
        var dict = new Object();
        var tmpCategory = "";
        $scope.points2 =new Array();
        $scope.categories=new Array();
        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        var points = localStorage.getItem("points");
        points =  JSON.parse(points);
        var token = $cookies.get($rootScope.currentuser.toString());
        function compareStrings(a, b) {
            // Assuming you want case-insensitive comparison
            a = a.toLowerCase();
            b = b.toLowerCase();
          
            return (a < b) ? -1 : (a > b) ? 1 : 0;
          }
          
          points.sort(function(a, b) {
            return compareStrings(a.category, b.category);
          })

        $scope.points_arr=[];
        $scope.points2 = new Object();

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
        
        for (let index1 = 0; index1 < points.length; index1++) {
            var a = new Object();
            a.name = points[index1].name;
            a.picture = "http://127.0.0.1:3000/images/"+points[index1].picture;
            a.id = index1;
            if(!($rootScope.currentuser.toString()=="Guest"))
                a.star ="images/star1.png"
            a.category = points[index1].category;
            $scope.points_arr.push(a);
        }
        if(!($rootScope.currentuser.toString()=="Guest")){
            $http({
                method : "GET",
                url : "http://localhost:3000/getInterest",
                headers: {
                "Authorization":token
                }
            }).then(function mySuccess(response) {
                $scope.points2 = response.data;
                for (let index1 = 0; index1 <  points.length; index1++) {
                    if($scope.points2.includes($scope.points_arr[index1].name)){
                        $scope.points_arr[index1].star = "images/star.png"
                    }
                    else{
                        $scope.points_arr[index1].star ="images/star1.png"

                    }
                }
                }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });
        }

        $scope.sort = function(){
            tmpCategory = $scope.container.category.category;
            $scope.points_arr=[];
            for (let index1 = 0; index1 < points.length; index1++) {
                if(points[index1].category == tmpCategory || tmpCategory =="all"){
                    var a = new Object();
                    a.name = points[index1].name;
                    a.picture = "http://127.0.0.1:3000/images/"+points[index1].picture;
                    a.id = index1;
                    a.category = points[index1].category;
                    $scope.points_arr.push(a);
                }
            }
            
            if(!($rootScope.currentuser.toString()=="Guest")){
                $http({
                    method : "GET",
                    url : "http://localhost:3000/getInterest",
                    headers: {
                    "Authorization":token
                    }
                }).then(function mySuccess(response) {
                    $scope.points2 = response.data;
                    for (let index1 = 0; index1 <  points.length; index1++) {
                        if($scope.points2.includes($scope.points_arr[index1].name)){
                            $scope.points_arr[index1].star = "images/star.png"
                        }
                        else{
                            $scope.points_arr[index1].star ="images/star1.png"
        
                        }
                    }
                    }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                }); 
            }
        }

        $scope.idshow="";
        $scope.IsDisplay = false;
        $scope.showPoint="";
        $scope.pointInfo ="";
        $scope.recentReview = "";

        $scope.clickMe = function(clicked,event,poiName){
            if(modal.style.display = "none")
                modal.style.display = "block";
            else
                modal.style.display = "none";
            
            $scope.idshow = event.target.id;
            $scope.IsDisplay = clicked == true ? false : true;
            /* modal setting picture */

            var index_of_oldArr =  points.findIndex(obj => obj.name==[poiName]);
            var index_of_newArr =  $scope.points_arr.findIndex(obj => obj.name==[poiName]);
            $scope.showPoint = $scope.points_arr[index_of_newArr];
            $scope.pointInfo = points[index_of_oldArr];
            $scope.recentReview = JSON.parse(points[index_of_oldArr].recent_reviews);
            var tmp = "";
            for(let in1 = 0; in1 < ($scope.recentReview).length;in1++){
                tmp = tmp + ($scope.recentReview)[in1].review + " " + ($scope.recentReview)[in1].date+"  " ;
            } 
            $scope.recentReview= tmp;  
        };


        $scope.search = function(){
            var value_to_search = document.getElementById("search").value;
            $scope.points_arr=[];
            for (let index1 = 0; index1 < points.length; index1++) {
                if(points[index1].name == value_to_search){
                    var a = new Object();
                    a.name = points[index1].name;
                    a.picture = "http://127.0.0.1:3000/images/"+points[index1].picture;
                    a.id = index1;
                    if(!($rootScope.currentuser.toString()=="Guest"))
                        a.star ="images/star1.png"
                    a.category = points[index1].category;
                    $scope.points_arr.push(a);
                }
            }
            if(!($rootScope.currentuser.toString()=="Guest")){
                $http({
                    method : "GET",
                    url : "http://localhost:3000/getInterest",
                    headers: {
                    "Authorization":token
                    }
                }).then(function mySuccess(response) {
                    $scope.points2 = response.data;
                    for (let index1 = 0; index1 <  points.length; index1++) {
                        if($scope.points2.includes($scope.points_arr[index1].name)){
                            $scope.points_arr[index1].star = "images/star.png"
                        }
                        else{
                            $scope.points_arr[index1].star ="images/star1.png"
    
                        }
                    }
                    }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            }
            if($scope.points_arr.length ==0){
                alert("no result found");
            }
        }

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
                    a.category = points[index1].category;
                    $scope.points_arr.push(a);
                }
            }
            if(!($rootScope.currentuser.toString()=="Guest")){
                $http({
                    method : "GET",
                    url : "http://localhost:3000/getInterest",
                    headers: {
                    "Authorization":token
                    }
                }).then(function mySuccess(response) {
                    $scope.points2 = response.data;
                    for (let index1 = 0; index1 <  points.length; index1++) {
                        if($scope.points2.includes($scope.points_arr[index1].name)){
                            $scope.points_arr[index1].star = "images/star.png"
                        }
                        else{
                            $scope.points_arr[index1].star ="images/star1.png"
        
                        }
                    }
                    }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });   
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
            var r =document.getElementById(event.target.id).parentElement.childNodes[3].currentSrc.split("/")[4];
            var t = document.getElementById(event.target.id).parentElement.childNodes[1].childNodes[0].data;
            if(r == "star1.png"){
                var arr_poiint_to_send = new Array();
                var arrpoitmp = new Array();
                $http({
                    method : "GET",
                    url : "http://localhost:3000/getRecentSavedPointsOfInterest/",
                    headers: {
                        "Authorization":token
                    }
                  }).then(function mySuccess(response) {
                    arrpoitmp = response.data;
                    var bool1 = true;
                    for (let index = 0; index < arrpoitmp.length; index++) {
                        if(t==arrpoitmp[index].name)
                        bool1=false;
                    }
                    if(bool1){
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
                    }, function myError(response) {
                      $scope.myWelcome = response.statusText;
                });
                
            }
            else{
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
