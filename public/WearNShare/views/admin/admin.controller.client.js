(function () {
    angular
        .module("WearNShare")
        .controller("AdminController", AdminController);


    function AdminController($location, $routeParams, ebayService,UserService,ProductReviewService,UserReviewService) {
        var vm =this;
        vm.getAllUserReview = getAllUserReview;
        vm.getAllProductReview = getAllProductReview;
        vm.getAllUser = getAllUser;
        vm.deleteUser = deleteUser;
        vm.deleteUserReview = deleteUserReview;
        vm.deleteProductReview = deleteProductReview;
        vm.logout = logout;

        function init(){
            getAllUserReview();
            getAllProductReview();
            getAllUser();
        }

        init();

        function getAllUserReview() {
            UserReviewService.findAllUserReviews()
                .success(function (usersReviews) {
                    vm.userReviews = usersReviews;
                    vm.userReviewCount = usersReviews.length;
                })
                .error(function () {
                    vm.error = "Unable to fetch user reviews";
                });
        }

        function getAllProductReview() {
            ProductReviewService.findAllProductReviews()
                .success(function (reviews) {
                    vm.prodReviews = reviews;
                    vm.prodReviewCount = reviews.length;
                })
                .error(function () {
                    vm.error = "Unable to fetch product reviews";
                });
        }

        function getAllUser() {
            UserService.findAllUser()
                .success(function (allUsers) {
                    vm.users = allUsers;
                    vm.usersCount = allUsers.length;
                })
                .error(function () {
                    vm.error = "Unable to fetch users ";
                });
        }


        function deleteUser(userId) {
            UserService.deleteUser(userId)
                .success(function (response) {
                    getAllUser();
                })
                .error(function () {
                    vm.error = "Unable to fetch users ";
                });
        }

        function deleteUserReview(id) {
            UserReviewService.deleteUserReview(id)
                .success(function (response) {
                    getAllUserReview();
                })
                .error(function () {
                    vm.error = "Unable to fetch users ";
                });
        }

        function deleteProductReview(id) {
            ProductReviewService.deleteProductReview(id)
                .success(function (response) {
                    getAllProductReview();
                })
                .error(function () {
                    vm.error = "Unable to fetch users ";
                });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    });
        }
    }
})();




