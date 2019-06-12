angular.module("myApp")
    .controller("pointController", function ($scope,$http) {
        var points = localStorage.getItem("points");
        var flag = true;
        var in1 = true;
        for (let index = 0; index < points.length; index++) {
            flag = true;
            var node = document.createElement("LI");
            //name
            var name_user = document.createElement("H1");
            var text = document.createTextNode(points[0]);
            name_user.appendChild(text);
            node.appendChild(name_user);
            //pic            
            var name_pic = "";
            var i = new Image(100,50);
            while(flag){
                if(in1){
                    in1 = false;
                    $http({
                        method : "GET",
                        url : "http://localhost:3000/getChosenPictureByPoint/"+points[0]
                    }).then(function mySuccess(response) {
                        name_pic = response.data;
                        i.src = "http://127.0.0.1:3000/images/"+name_pic;
                        node.appendChild(i);
                        document.getElementById("points_ul").appendChild(node);
                        flag = false;
                        in1 = true;
                        }, function myError(response) {
                        name_pic = response.statusText;
                    });
                }
            }
            
            // //description
            // var description = document.createElement("p");
            // description.createTextNode(users[3]);
            // node.appendChild(description);
            // //rank
            // var rank = document.createElement("p");
            // rank.createTextNode("rank : " +users[7]);
            // node.appendChild(rank);
            

                 
        }
       
});