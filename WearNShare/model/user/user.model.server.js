module.exports = function (connection) {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findAllUser: findAllUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        addFollowersForUserId: addFollowersForUserId,
        addLikesForUserId: addLikesForUserId,
        findLikesForUserById:findLikesForUserById,
        findFollowersForUserById:findFollowersForUserById
    };
    return api;


    function findAllUser() {
        return connection.query({
            sql: 'SELECT * FROM `Users`',
            timeout: 60000, // 40s
           // values: [userId]
        })
    }

    function createUser(user) {
        user.registeredOn = new Date();
        return connection.query('INSERT INTO Users SET ?', user);
    }

    function findUserById(userId) {
        return connection.query({
            sql: 'SELECT * FROM `Users` WHERE `id` = ?',
            timeout: 40000, // 40s
            values: [userId]
        })

    }

    function findUserByCredentials(username, password) {
        /* return UserModel.find( //use alternatively findOne
         {
         username: username,
         password: password
         });*/
    }

    function findUserByUsername(username) {

        /* return new Promise(function (resolve, reject) {
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
         });*/

        return connection.query({
            sql: 'SELECT * FROM `Users` WHERE `username` = ?',
            timeout: 40000, // 40s
            values: [username]
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

    function findLikesForUserById(userId) {
        return connection.query({
            sql: 'SELECT * FROM `likes` l inner join `users` u WHERE l.likedBy = u.id and l.likes = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }

    function findFollowersForUserById(userId) {
        return connection.query({
            sql: 'SELECT * FROM `follows` f inner join `users` u WHERE f.followedBy = u.id and f.follows = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }
};