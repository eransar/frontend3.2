angular.module("myApp")
    .controller("pointController", function ($scope,$http) {
        var points = localStorage.getItem("points");
        points =  JSON.parse(points);
        $scope.points_arr=[];
        
        for (let index1 = 0; index1 < points.length; index1++) {
            var a = new Object()
            a.name = points[index1].name;
            a.picture = "http://127.0.0.1:3000/images/"+points[index1].picture
            $scope.points_arr.push(a);
        }
        


        // for (let index1 = 0; index1 < points.length; index1++) {
        //     var node = document.createElement("DIV");
        //     //name
        //     var name_user = document.createElement("H3");
        //     name_user.setAttribute("id","name_user_h3")
        //     var text = document.createTextNode(points[index1].name);
        //     name_user.appendChild(text);
        //     node.appendChild(name_user);
        //     var img = new Image(320,280);
        //     img.setAttribute("class","image_id");
        //     img.setAttribute("onclick","imgClick()");
        //     img.src = "http://127.0.0.1:3000/images/"+points[index1].picture;
        //     node.appendChild(img);
        //     // var rank = document.createElement("h3");
        //     // rank.setAttribute("class", "rank_class");
        //     // var text1 = document.createTextNode("Rank: "+points[index1].total_rank);
        //     // rank.appendChild(text1);
        //     // node.appendChild(rank);
        //     document.getElementById("points_div").appendChild(node);
        //     node.setAttribute("class", "image_class");
            

        // }
});

function imgClick(){
    
}