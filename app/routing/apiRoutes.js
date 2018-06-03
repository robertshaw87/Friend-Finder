var friends = require("../data/friends.js");
var path = require("path");
var exports = module.exports = {};

exports.attach = function (server) {
    server.get("/api/friends", function (request, response) {
        console.log(friends);
        response.json(friends);
    });

    server.get("/api/bestfriend/:user", function (request, response) {
        var user;
        friends.forEach(elem => {
            if (elem.name === request.params.user) {
                user = elem;
            }
        });
        response.json(findBestFriend(user));
    });

    server.post("/api/friends", function (request, response) {
        friends.push(request.body);
    })
}

function findBestFriend(user){
    var user = request.body;
    var bestFriend, bestCompatibility;
    friends.forEach(currFriend => {
        if (!bestFriend) {
            bestFriend = currFriend;
            bestCompatibility = compareFriends(bestFriend.scores, user.scores);
        }
        var currCompatibility = compareFriends(currFriend.scores, user.scores);
        if (bestCompatibility > currCompatibility) {
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