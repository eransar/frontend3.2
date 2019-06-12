angular.module("myApp")
    .controller("pointController", function ($scope,$http) {
        // Get the modal
        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        var points = localStorage.getItem("points");
        points =  JSON.parse(points);
        $scope.points_arr=[];
        
        for (let index1 = 0; index1 < points.length; index1++) {
            var a = new Object()
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
            if(modal.style.display = "none")
                modal.style.display = "block";
            else
                modal.style.display = "none"
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

        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }  
        span.onclick = function() {
            modal.style.display = "none";
        }
});
