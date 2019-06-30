angular.module("myApp")
    .controller("favoritesController", function ($scope,$http,$cookies,$rootScope) {
        // Get the modal
        $scope.fav_img = "star1.png"
        var tmpCategory = "";
        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        var points = [];
        var points1 = JSON.parse(localStorage.getItem("points"));
        // points =  JSON.parse(points);
        $scope.points_arr=[];
        var token_scope =$cookies.get($rootScope.currentuser);
        var i =5;
        var user1=$rootScope.currentuser;
        var tempPoints=[];
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

        

        $http({

            method : "GET",
            url : "http://localhost:3000/getInterest",
            headers: {
            "Authorization":token_scope
            }
          }).then(function mySuccess(response) {
              var points2 = response.data;
              for (let index = 0; index < points2.length; index++) {
                var index_of_fav =  points1.findIndex(obj => obj.name==[points2[index]]);
                var a = new Object();
                a.name = points1[index_of_fav].name;
                a.picture = "http://127.0.0.1:3000/images/"+points1[index_of_fav].picture;
                a.id = index_of_fav;
                a.category = points1[index_of_fav].category;
                a.total_rank = points1[index_of_fav].total_rank;
                $scope.points_arr.push(a);
            }
            tempPoints = $scope.points_arr;
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
        });

        /** sorting categories */
        $scope.sort = function(){
            var points = tempPoints;
            tmpCategory = $scope.container.category.category;
            $scope.points_arr=[];
            for (let index1 = 0; index1 < points.length; index1++) {
                if(points[index1].category == tmpCategory || tmpCategory =="all"){
                    var a = new Object();
                    a.name = points[index1].name;
                    a.picture = points[index1].picture;
                    a.id = index1;
                    a.total_rank = points1[index1].total_rank;
                    a.category =points1[index1].category ;
                    $scope.points_arr.push(a);
                }
            }
        };
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
                $scope.questions = response.data;
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
              });
              
        };

        $scope.sortByRank = function(){
            var p_arr = tempPoints;
            if(p_arr !=null && p_arr != ""){
                p_arr.sort((a, b) => b.total_rank - a.total_rank);
            }
            $scope.points_arr=[];
            for (let index1 = 0; index1 < p_arr.length; index1++) {
                    var a = new Object();
                    a.name = points1[index1].name;
                    a.picture = p_arr[index1].picture;
                    a.id = index1;
                    a.total_rank = points1[index1].total_rank;
                    a.category =points1[index1].category ;
                    $scope.points_arr.push(a);
                
            }            
        }

        $scope.imgStar = function(name){
            // var t = document.getElementById(event.target.id).parentElement.childNodes[1].childNodes[0].data;
            var t = name;
            $http({
                method : "DELETE",
                url : "http://localhost:3000/deletePointOfInterest",
                data: {
                        user_name :{
                            username:$rootScope.currentuser
                        } ,
                        point_name : name
                },
                headers: {
                    'Content-Type':"application/json;charset=utf-8",
                    "Authorization":token_scope,
                }
              }).then(function mySuccess(response) {
                // console.log(response.data);
                $scope.points_arr=[];
                $http({

                    method : "GET",
                    url : "http://localhost:3000/getInterest",
                    headers: {
                    "Authorization":token_scope
                    }
                  }).then(function mySuccess(response) {
                      var points2 = response.data;
                      for (let index1 = 0; index1 < points1.length; index1++) {
                        if(points2.includes(points1[index1].name)){
                            var a = new Object();
                            a.name = points1[index1].name;
                            a.picture = "http://127.0.0.1:3000/images/"+points1[index1].picture;
                            a.id = index1;
                            $scope.points_arr.push(a);
                        }
                    }
                    }, function myError(response) {
                      $scope.myWelcome = response.statusText;
                });
                $scope.questions = response.data;
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
              });
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

        $scope.dragAndDrop = function(point_name){
            try{
                var t_id = event.target.id;
                var id_number = $scope.points_arr.findIndex(obj => obj.name==[point_name]);
                if(t_id == "submitLeft"){
                    if(id_number != 0 ){
                        var b = $scope.points_arr[id_number];
                        $scope.points_arr[id_number] = $scope.points_arr[id_number-1];
                        $scope.points_arr[id_number-1] = b;
                    }
                }
                else{
                    if(id_number != $scope.points_arr.length-1 ){
                        var b = $scope.points_arr[id_number];
                        $scope.points_arr[id_number] = $scope.points_arr[id_number+1];
                        $scope.points_arr[id_number+1] = b;
                    }
                }
                var category_arr_to_save = new Array();
                for (let index = 0; index < $scope.points_arr.length; index++) {
                    category_arr_to_save.push($scope.points_arr[index].name);
                }
                $http({
                    method : "POST",
                    url : "http://localhost:3000/newOrderOfInterest",
                    data: {
                            username: $rootScope.currentuser.toString() ,
                            pointsNames: category_arr_to_save
                    },
                    headers: {
                        "Authorization":token_scope,
                    }
                }).then(function mySuccess(response) {
                    }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            }catch(err){
                return;
            }
            
        }
});
