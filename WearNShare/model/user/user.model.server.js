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
        findLikesForUserById: findLikesForUserById,
        findFollowersForUserById: findFollowersForUserById
    };
    return api;


    function findAllUser() {
        return connection.query({
            sql: 'SELECT * FROM `Users`',
            timeout: 60000
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

    function findUserByUsername(username) {
        return connection.query({
            sql: 'SELECT * FROM `Users` WHERE `username` = ?',
            timeout: 40000, // 40s
            values: [username]
        });
    }

    function updateUser(userId, user) {
        var newUpdate = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            url: user.url
        };
        return connection.query({
            sql: 'UPDATE `Users` SET ? WHERE id = ?',
            timeout: 40000, // 40s
            values: [newUpdate, userId]
        })
    }

    // Might need it later. Currently taken care by findById
    function findUserByCredentials(username, password) {
        console.log("findUserByCredentials : Should not be called in this release")
    }

    function deleteUser(userId) {
        return connection.query({
            sql: 'DELETE FROM `Users` WHERE id = ?',
            timeout: 40000,
            values: [userId]
        })
    }

    function addFollowersForUserId(userId, sellerId) {
        var follows = {};
        follows.followedBy = userId;
        follows.follows = sellerId;
        return connection.query('INSERT INTO follows SET ?', follows);
    }

    function addLikesForUserId(userId, sellerId) {
        var likes = {};
        likes.likedBy = userId;
        likes.likes = sellerId;
        return connection.query('INSERT INTO likes SET ?', likes);
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