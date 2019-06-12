angular.module("myApp")
    .controller("pointController", function ($scope,$http) {
        var points = localStorage.getItem("points");
        points =  JSON.parse(points);
        for (let index1 = 0; index1 < points.length; index1++) {
            var node = document.createElement("DIV");
            //name
            var name_user = document.createElement("H3");
            name_user.setAttribute("id","name_user_h3")
            var text = document.createTextNode(points[index1].name);
            name_user.appendChild(text);
            node.appendChild(name_user);
            var img = new Image(320,280);
            img.setAttribute("class","image_id");
            img.src = "http://127.0.0.1:3000/images/"+points[index1].picture;
            node.appendChild(img);
            // var rank = document.createElement("h3");
            // rank.setAttribute("class", "rank_class");
            // var text1 = document.createTextNode("Rank: "+points[index1].total_rank);
            // rank.appendChild(text1);
            // node.appendChild(rank);
            document.getElementById("points_div").appendChild(node);
            node.setAttribute("class", "image_class");
            

        }
        console.log("ss");
        
            
            // //description
            // var description = document.createElement("p");
            // description.createTextNode(users[3]);
            // node.appendChild(description);
            // //rank
            // var rank = document.createElement("p");
            // rank.createTextNode("rank : " +users[7]);
            // node.appendChild(rank);           
        
});