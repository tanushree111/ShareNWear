module.exports = function (connection) {

    var api = {
        createProductReview: createProductReview,
        deleteProductReview: deleteProductReview,
        findProductReviewByUser: findProductReviewByUser,
        findAllProductReview: findAllProductReview,
        findReviewsByProduct: findReviewsByProduct
    };
    return api;

    function findAllProductReview(productId) {
        return connection.query({
            sql: 'SELECT * FROM `ProductReviews`',
            timeout: 40000 // 40s
        });
    }

    function createProductReview(review) {
        return connection.query('INSERT INTO ProductReviews SET ?', review);
    }

    function deleteProductReview(reviewId) {
        return connection.query({
            sql: 'DELETE FROM ProductReviews  WHERE `id` = ?',
            timeout: 40000, // 40s
            values: [reviewId]
        });
    }

    function findProductReviewByUser(userId) {
        return connection.query({
            sql: 'SELECT * FROM `ProductReviews` WHERE `reviewer` = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }

    function findReviewsByProduct(userId) {
        return connection.query({
            sql: 'SELECT * FROM `ProductReviews` WHERE `productId` = ?',
            timeout: 40000, // 40s
            values: [productId]
        });
    }

};