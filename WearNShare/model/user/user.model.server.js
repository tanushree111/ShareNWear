module.exports = function (connection) {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserById1: findUserById1,
        findAllUser: findAllUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        // findFollowersByUserId: findFollowersByUserId,
        // findLikesByUserId: findLikesByUserId,
        addFollowersForUserId: addFollowersForUserId,
        addLikesForUserId: addLikesForUserId
    };
    return api;


    function findAllUser() {
        //return UserModel.find();
    }

    function createUser(user) {
        return new Promise(function (resolve, reject) {
            user.registeredOn = new Date();
            connection.query('INSERT INTO Users SET ?', user, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(results);
            });
        });


    }

    function findUserById(userId) {
        return new Promise(function (resolve, reject) {
            connection.query({
                sql: 'SELECT * FROM `Users` WHERE `id` = ?',
                timeout: 40000, // 40s
                values: [userId]
            }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    function findUserById1(userId) {
        return new Promise(function (resolve, reject) {
            connection.query({
                sql: 'SELECT * FROM `Users` WHERE `id` = ?',
                timeout: 40000, // 40s
                values: [userId]
            }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    function findUserByCredentials(username, password) {
        /* return UserModel.find( //use alternatively findOne
         {
         username: username,
         password: password
         });*/
    }

    function findUserByUsername(username) {

        return new Promise(function (resolve, reject) {
            connection.query({
                sql: 'SELECT * FROM `Users` WHERE `username` = ?',
                timeout: 40000, // 40s
                values: [username]
            }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    function updateUser(userId, user) {
        /* return UserModel.update(
         {
         _id: userId
         },
         {
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         phone: user.phone,
         address: user.address,
         url: user.url
         });*/
    }

    function deleteUser(userId) {
        /* return UserModel.remove(
         {
         _id: userId
         });*/
    }

    function findUserByFacebookId(facebookId) {
        // return UserModel.findOne({'facebook.id': facebookId});
    }

    /*function findFollowersByUserId(userId) {
     return UserModel.findById(userId).populate("followers", "username firstName lastName").exec();
     }

     function findLikesByUserId(userId) {
     return UserModel.findById(userId).populate("likes", "username firstName lastName").exec();
     }*/

    function addFollowersForUserId(userId, sellerId) {
        /* return UserModel
         .findById(sellerId)
         .then(function(user){
         user.followers.push(userId);
         user.save();
         });*/
    }

    function addLikesForUserId(userId, sellerId) {
        /* return UserModel
         .findById(sellerId)
         .then(function(user){
         user.likes.push(userId);
         user.save();
         });*/
    }

};