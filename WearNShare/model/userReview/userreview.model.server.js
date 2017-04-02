module.exports = function(connection) {

    var api = {
        createUserReview: createUserReview,
        deleteUserReview: deleteUserReview,
        findUserReviewByUserId: findUserReviewByUserId,
        findAllUserReview:findAllUserReview,
        findUserReviewForUserId: findUserReviewForUserId
    };
    return api;

    function findAllUserReview(review){
       /* return UserReviewModel.find({});*/
        return new Promise(function (resolve, reject) {
            connection.query({
                sql: 'SELECT * FROM `UserReviews`',
                timeout: 40000 // 40s
               // values: [userId]
            }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    function createUserReview(review){
        return new Promise(function (resolve, reject) {
            connection.query('INSERT INTO UserReviews SET ?', review, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    function deleteUserReview(reviewId){
       /* return UserReviewModel.remove(
            {
                _id: reviewId
            });*/

        return new Promise(function (resolve, reject) {
            connection.query({
                sql: 'DELETE INTO UserReviews  WHERE `providedBy` = ? AND `receivedFor` = ?`',
                timeout: 40000, // 40s
                values: [reviewId,reviewId]
            }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    function findUserReviewByUserId(userId){
        /*return UserReviewModel.find({'by': userId})
            .populate("by", "username firstName lastName")
            .populate("for", "username firstName lastName")
            .exec();*/
        //return UserReviewModel.find(userId).populate("websites", "name").exec();

        return new Promise(function (resolve, reject) {
            connection.query({
                sql: 'SELECT * FROM `UserReviews` WHERE `providedBy` = ?',
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

    function findUserReviewForUserId(userId) {
        /*return UserReviewModel.find({'for': userId})
            .populate("by", "username firstName lastName")
            .populate("for", "username firstName lastName")
            .exec();*/

        return new Promise(function (resolve, reject) {
            connection.query({
                sql: 'SELECT * FROM `UserReviews` WHERE `receivedFor` = ?',
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

};