var path = require("path");
var exports = module.exports = {};

exports.attach = function (app) {
   
    app.get("/survey", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("*", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/home.html"));
    });
}