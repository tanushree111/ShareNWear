module.exports = function() {

    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'ABcd@1234',
        database : 'dbproj'
    });


    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });

    var userModel = require("./user/user.model.server")(connection);

    var model = {
        userModel: userModel
    };

    return model;
};