(function () {
    angular
        .module('WearNShare')
        .factory("UserReviewService", UserReviewService);

    function UserReviewService($http) {
        var api = {
            "createUserReview": createUserReview,
            "findUserReviewByUserId": findUserReviewByUserId,
            "findUserReviewForUserId": findUserReviewForUserId,
            "deleteUserReview": deleteUserReview,
            "findAllUserReviews" : findAllUserReviews

        };
        return api;

        function createUserReview(review) {
            var url = "/api/userReview";
            return $http.post(url, review);
        }

        function findUserReviewByUserId(userId) {
            var url = "/api/userReview/userReviewBy/"+userId;
            return $http.get(url);
        }

        function findUserReviewForUserId(userId) {
            var url = "/api/userReview/userReviewFor/"+userId;
            return $http.get(url);
        }

        function findAllUserReviews() {
            var url = "/api/userReview/all";
            return $http.get(url);
        }

        function deleteUserReview(reviewId) {
            var url = "/api/userReview/"+reviewId;
            return $http.delete(url);

        }
    }

})();