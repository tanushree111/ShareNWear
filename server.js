var express = require('express');
var cors = require('cors');
var mysql = require('promise-mysql');
var app = express();
var xmlparser = require('express-xml-bodyparser');

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var ebay = require('ebay-api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET || "secret"}));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ABcd@1234',
    database: 'dbproj'
}).then(function (conn) {
    var connection = conn;
    var userModel = require("./WearNShare/model/user/user.model.server")(connection);
    var messageModel = require("./WearNShare/model/message/message.model.server")(connection);
    var userReviewModel = require("./WearNShare/model/userReview/userreview.model.server")(connection);
    var model = {
        userModel: userModel,
        messageModel: messageModel,
        userReviewModel: userReviewModel
    };
    require("./WearNShare/app.js")(app, model);
    app.set('ipaddress', (process.env.IP));
    app.set('port', (process.env.PORT || 3000));
    app.listen(app.get('port'), app.get('ipaddress'));
});






