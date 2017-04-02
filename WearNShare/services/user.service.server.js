module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var mime = require('mime'); // npm install mime --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../public/WearNShare/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({storage: storage});
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var bcrypt = require("bcrypt-nodejs");

    app.post('/api/upload', upload.single('myFile'), uploadImage);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/all', findAllUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.put('/api/user/:uid/seller/:sellerId/follow', addFollowersForUserId);
    app.put('/api/user/:uid/seller/:sellerId/like', addLikesForUserId);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedin);
    app.post('/api/checkAdmin', checkAdmin);

    function findAllUser(req, res) {
        model
            .userModel
            .findAllUser()
            .then(
                function (users) {
                    if (users.length > 0) {
                        res.json(users);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findUser(req, res) {
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else {
            findUserByUsername(req, res);
        }

    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (users) {
                    if (users.length > 0) {
                        res.json(users[0]);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {
                    if (users.length > 0) {
                        res.json(users[0]);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*for(var u in users){
         if(users[u].username === username && users[u].password === password){
         res.send(users[u]);
         return;
         }
         }
         res.send(0);*/
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (users) {
                    if (users.length != 0) {
                        res.send(users[0]);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        /*user._id = (new Date()).getTime().toString();
         users.push(user);*/
        model
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        /*for(var u in users){
         if(users[u]._id === uid){
         users[u] = user;
         }
         }
         res.send(200);*/
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteUser(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function addFollowersForUserId(req, res) {
        var uid = req.params.uid;
        var sellerId = req.params.sellerId;
        model
            .userModel
            .addFollowersForUserId(uid, sellerId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function addLikesForUserId(req, res) {
        var uid = req.params.uid;
        var sellerId = req.params.sellerId;
        model
            .userModel
            .addLikesForUserId(uid, sellerId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user.id)
            .then(
                function (users) {
                    done(null, users[0]);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (users) {
                    //if (user.length == 1 && bcrypt.compareSync(password, user[0].password)) {
                    if (users.length == 1 && users[0].password == password) {
                        return done(null, users[0]);
                    } else {
                        return done(null, false);
                    }
                },
                 function (err) {
                    if (err) {
                        return done(err);
                    }
                 }

            )
            .catch(function (error) {
                console.log("error");
            });
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    model.userModel
        .createUser(user)
        .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            },
            function (err) {
                res.status(400).send(err);
            }
        );
}

function loggedin(req, res) {
    var a = req.isAuthenticated();
    res.send(a ? req.user : '0');
}

function checkAdmin(req, res) {
    var loggedIn = req.isAuthenticated();
    var isAdmin = false;
    if (req.user != undefined) {
        isAdmin = req.user.role == "ADMIN";
    }
    if (loggedIn && isAdmin) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function uploadImage(req, res) {
    var url = "";
    var userId = req.body.userId;
    var myFile = req.file;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;
    if (userId != null && userId != "") {
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if (user) {
                        user.url = '/WearNShare/uploads/' + filename;
                        model
                            .userModel
                            .updateUser(userId, user)
                            .then(
                                function (status) {
                                    url = '../WearNShare/index.html#/user';
                                    res.redirect(url);
                                },
                                function (error) {
                                    // res.sendStatus(400).send(error);
                                }
                            );

                    } else {
                        url = '/';
                    }

                },
                function (error) {
                    url = '/';
                }
            );
    } else {
        url = '/'
    }


}
};