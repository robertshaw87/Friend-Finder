var friends = require("../data/friends.js");
var path = require("path");
var exports = module.exports = {};

exports.attach = function (server) {
    server.get("/api/friends", function (request, response) {
        console.log(friends);
        response.json(friends);
    });

    // server.get("/api/bestfriend/:user", function (request, response) {
    //     var user;
    //     // console.log(request.params.user)
    //     friends.forEach(elem => {
    //         console.log(elem.name + " " + request.params.user)
    //         if (elem.name === request.params.user) {
    //             user = elem;
    //             console.log("MATCH!")
    //         }
    //     });
    //     console.log(user);
    //     var bestFriend = findBestFriend(user);
    //     console.log(bestFriend)
    //     response.json(bestFriend);
    // });

    server.post("/api/friends", function (request, response) {
        var bestFriend = findBestFriend(request.body);
        friends.push(request.body);
        response.json(bestFriend);
    })
}

function findBestFriend(user){
    var bestFriend, bestCompatibility;
    friends.forEach(currFriend => {
        if (!bestFriend) {
            bestFriend = currFriend;
            bestCompatibility = compareFriends(bestFriend.scores, user.scores);
        }
        var currCompatibility = compareFriends(currFriend.scores, user.scores);
        if ((bestCompatibility > currCompatibility) && (currFriend.name != user.name)) {
            bestFriend = currFriend;
            bestCompatibility = currCompatibility;
        }
    })
    if (!bestFriend)
        bestFriend = user;
    console.log(bestFriend);
    return bestFriend;
}

compareFriends = function (friend1, friend2) {
    var totalDiff = 0;
    for (var i=0; i < friend1.length; i++) {
        totalDiff += Math.abs(friend1[i] - friend2[i]);
    }
    return totalDiff;
}