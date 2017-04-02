var express = require('express');
var cors = require('cors');
var app = express();
var xmlparser = require('express-xml-bodyparser');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
//var ebay = require('ebay-api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET  || "secret" }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

require("./WearNShare/app.js")(app);


app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), app.get('ipaddress'));

