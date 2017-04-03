module.exports = function (connection) {

    var api = {
        createProductReview: createProductReview,
        deleteProductReview: deleteProductReview,
        findProductReviewByUser: findProductReviewByUser,
        findAllProductReview: findAllProductReview,
        findReviewsByProduct: findReviewsByProduct
    };
    return api;

    function findAllProductReview() {
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
            sql: 'SELECT * FROM `ProductReviews` p, `Users` u WHERE p.reviewer = u.id AND `reviewer` = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }

    function findReviewsByProduct(productId) {
        return connection.query({
            sql: 'SELECT p.reviewer, p.productId, p.rating, p.title, p.description, pd.extId, u.firstName FROM `ProductReviews` p, `Products` pd, `Users` u ' +
            'WHERE p.productId = pd.id AND p.reviewer = u.id AND pd.extId = ?',
            timeout: 40000, // 40s
            values: [productId]
        });
    }

};