module.exports = function (connection) {

    var api = {
        createUserReview: createUserReview,
        deleteUserReview: deleteUserReview,
        findUserReviewByUserId: findUserReviewByUserId,
        findAllUserReview: findAllUserReview,
        findUserReviewForUserId: findUserReviewForUserId
    };
    return api;

    function findAllUserReview(review) {
        /* return UserReviewModel.find({});*/
        return connection.query({
            sql: 'SELECT * FROM `UserReviews`',
            timeout: 40000 // 40s
            // values: [userId]
        });
    }

    function createUserReview(review) {
        return connection.query('INSERT INTO UserReviews SET ?', review);
    }

    function deleteUserReview(reviewId) {
        /* return UserReviewModel.remove(
         {
         _id: reviewId
         });*/

        return connection.query({
            sql: 'DELETE FROM UserReviews  WHERE `providedBy` = ? AND `receivedFor` = ?`',
            timeout: 40000, // 40s
            values: [reviewId, reviewId]
        });
    }

    function findUserReviewByUserId(userId) {
        /*return UserReviewModel.find({'by': userId})
         .populate("by", "username firstName lastName")
         .populate("for", "username firstName lastName")
         .exec();*/
        //return UserReviewModel.find(userId).populate("websites", "name").exec();

        return connection.query({
            sql: 'SELECT * FROM `UserReviews` ur inner join `Users` u WHERE ur.reviewer = u.id and `reviewer` = ?',
            timeout: 40000, // 40s
            values: [userId]
        });

    }

    function findUserReviewForUserId(userId) {
        /*return UserReviewModel.find({'for': userId})
         .populate("by", "username firstName lastName")
         .populate("for", "username firstName lastName")
         .exec();*/

        return connection.query({
            sql: 'SELECT * FROM `UserReviews` ur inner join `Users` u WHERE ur.reviewFor = u.id and `reviewFor` = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }

};