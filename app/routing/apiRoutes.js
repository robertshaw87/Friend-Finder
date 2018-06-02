var friends = require("../data/friends.js");
var path = require("path");
var exports = module.exports = {};

exports.attach = function (server) {
    server.get("/api/friends", function (request, response) {
        console.log(friends);
        response.json(friends);
    });

    server.get("/api/friends/:friend", function (request, response) {
        var targetFriend;
        friends.forEach(elem => {
            if (elem.name === request.params.friend) {
                targetFriend = elem;
            }
        });
        response.json(targetFriend);
    });

    server.post("/api/friends", function (request, response) {
        var user = request.body;
        var bestFriend, bestCompatibility;
        friends.forEach(function (currFriend) {
            if (!bestFriend) {
                bestFriend = currFriend;
                bestCompatibility = this.compareFriends(bestFriend, user);
            }
            var currCompatibility = this.compareFriends(currFriend, user);
            if (bestCompatibility > currCompatibility) {
                bestFriend = currFriend;
                bestCompatibility = currCompatibility;
            }
        });
        friends.push(user);
        response.json(bestFriend);
    })
}

exports.compareFriends = function (friend1, friend2) {
    var totalDiff = 0;
    for (var i=0; i < friend1.length; i++) {
        totalDiff += Math.abs(friend1[i] - friend2[i]);
    }
    return totalDiff
}