var express = require("express");
var bodyParser = require("body-parser");


var server = express();
var PORT = process.env.PORT || 8080;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use("/app", express.static(require("path").join(__dirname + "/app/public")));

require("./app/routing/apiRoutes.js").attach(server);
require("./app/routing/htmlRoutes.js").attach(server);

server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});