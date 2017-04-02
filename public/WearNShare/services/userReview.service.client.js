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
            var url = "/api/user/"+userId+"/userReviewBy";
            return $http.get(url);
        }

        function findUserReviewForUserId(userId) {
            var url = "/api/user/"+userId+"/userReviewFor";
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