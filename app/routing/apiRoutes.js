var friends = require("../data/friends.js");
var path = require("path");
var exports = module.exports = {};

exports.attach = function (server) {
    server.get("/api/friends", function (request, response) {
        response.json(friends);
    });

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
    return bestFriend;
}

compareFriends = function (friend1, friend2) {
    var totalDiff = 0;
    for (var i=0; i < friend1.length; i++) {
        totalDiff += Math.abs(friend1[i] - friend2[i]);
    }
    return totalDiff;
}