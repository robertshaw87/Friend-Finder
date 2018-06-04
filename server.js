var express = require("express");
var bodyParser = require("body-parser");

var server = express();
var PORT = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use("/app/css", express.static(__dirname + "/public/css"));
server.use("/app/script", express.static(__dirname + "/public/script"));

require("./app/routing/apiRoutes.js").attach(server);
require("./app/routing/htmlRoutes.js").attach(server);

server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});