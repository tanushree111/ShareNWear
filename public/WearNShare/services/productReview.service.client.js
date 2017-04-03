(function () {
    angular
        .module('WearNShare')
        .factory("ProductReviewService", ProductReviewService);

    function ProductReviewService($http) {
        var api = {
            "createProductReview": createProductReview,
            "findProductReviewByUser": findProductReviewByUser,
            "findReviewsByProduct": findReviewsByProduct,
            "deleteProductReview": deleteProductReview,
            "findAllProductReviews" :findAllProductReviews

        };
        return api;

        function createProductReview(userId, prodSize, review) {
            var url = "/api/user/"+userId+"/"+prodSize+"/productReview";
            return $http.post(url, review);
        }

        function findProductReviewByUser(userId) {
            var url = "/api/user/"+userId+"/productReview";
            return $http.get(url);
        }

        function findReviewsByProduct(productId) {
            var url = "/api/product/"+productId+"/productReview";
            return $http.get(url);
        }

        function findAllProductReviews() {
            var url = "/api/productReview/all";
            return $http.get(url);
        }

        function deleteProductReview(reviewId) {
            var url = "/api/productReview/"+reviewId;
            return $http.delete(url);

        }
    }

})();