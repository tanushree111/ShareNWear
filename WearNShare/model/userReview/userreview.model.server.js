module.exports = function (connection) {

    var api = {
        createUserReview: createUserReview,
        deleteUserReview: deleteUserReview,
        findUserReviewByUserId: findUserReviewByUserId,
        findAllUserReview: findAllUserReview,
        findUserReviewForUserId: findUserReviewForUserId
    };
    return api;

    function findAllUserReview() {
        return connection.query({
            sql: 'SELECT * FROM `UserReviews` ur, `Users` u WHERE ur.reviewer = u.id',
            timeout: 40000
        });
    }

    function createUserReview(review) {
        return connection.query('INSERT INTO UserReviews SET ?', review);
    }

    function deleteUserReview(reviewId) {
        return connection.query({
            sql: 'DELETE FROM UserReviews  WHERE `id` = ?',
            timeout: 40000,
            values: [reviewId]
        });
    }

    function findUserReviewByUserId(userId) {
        return connection.query({
            sql: 'SELECT * FROM `UserReviews` ur inner join `Users` u WHERE ur.reviewFor = u.id and `reviewer` = ?',
            timeout: 40000,
            values: [userId]
        });

    }

    function findUserReviewForUserId(userId) {
        return connection.query({
            sql: 'SELECT * FROM `UserReviews` ur inner join `Users` u WHERE ur.reviewer = u.id and `reviewFor` = ?',
            timeout: 40000,
            values: [userId]
        });
    }

};