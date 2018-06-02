var path = require("path");
var exports = module.exports = {};

exports.attach = function (app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    
    app.get("/view-res", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/view-reservations.html"));
    });
}