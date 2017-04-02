(function () {
    angular
        .module("WearNShare")
        .controller("ProductDetailController", ProductDetailController);


    function ProductDetailController($location, $route, $routeParams, ebayService, ProductReviewService, UserService, $sce, RentalService, $rootScope, $scope) {
        var vm = this;
        vm.sizes = ['Small', 'Medium', 'Large'];
        vm.elementId = $routeParams["eid"];
        vm.checkSafeHtml = checkSafeHtml;
        vm.reviews;
        vm.sellers;
        vm.selectedOption;
        vm.singleModel = 1;
        vm.mode = 'Rent';
        vm.selectedOption = "Small";
        vm.init = init;
        vm.alerts = [];
        vm.toggleShowReview = toggleShowReview;
        vm.createRental = createRental;
        vm.updateRental = updateRental;
        vm.findRentalsByProduct = findRentalsByProduct;
        vm.addAlert = addAlert;
        vm.postProdReview = postProdReview;
        vm.getProductReviews = getProductReviews;
        vm.logout = logout;
        vm.userID = $rootScope.currentUser._id;
        vm.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };


        function init() {

            getProductDetails(vm.elementId);
            getRelatedProducts(vm.elementId);
            getProductReviews(vm.elementId);
            findRentalsByProduct(vm.selectedOption,vm.elementId);

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

        function toggleShowReview(show) {
            vm.showReview = show;
        }

        function addAlert() {
            vm.alerts.push({msg: 'Operation Process Successfully'});
        };

        function checkSafeHtml() {
            return $sce.trustAsHtml(vm.productDetail.Description);
        }

        function getProductDetails(elementId) {
            ebayService.getProductDetail(elementId)
                .then(function (product) {
                        vm.productDetail = product.Item;
                    },
                    function (error) {
                        //
                        console.log('error');
                    }
                )
        }

        function getProductReviews(elementId) {
            ProductReviewService
                .findReviewsByProduct(elementId)
                .success(function (reviews) {
                    vm.reviews = reviews;
                })
                .error(function () {
                    vm.error = "Unable to Fetch review";
                });

        }

        function getRelatedProducts(elementId) {
            ebayService.getRelatedProducts(elementId)
                .then(function (relproduct) {
                        vm.relProds = relproduct.getRelatedCategoryItemsResponse.itemRecommendations.item;
                    },
                    function (error) {
                        //
                        console.log('error');

                    })
        }

        function createRental() {
            var rental = {};
            rental.productId = vm.productDetail.ItemID;
            rental.size = vm.selectedOption;
            rental.price = vm.price;
            rental.lender = $rootScope.currentUser;
            RentalService.createRental(rental)
                .success(function (response) {
                    addAlert();
                    if (response === '0') {
                        //addAlert();
                    } else {
                        vm.mode = 'Rent';
                        vm.price = "";
                        //$location.url("#/productDetail/"+ vm.productDetail.ItemID);
                    }
                })
                .error(function (data) {
                    console.log(data);
                });

        }

        function updateRental(rental) {
            var rentalId = rental._id;
            rental.renter = $rootScope.currentUser;
            rental.available = false;
            RentalService.updateRental(rentalId, rental)
                .success(function (response) {
                    addAlert();
                    if (response === '0') {
                        //addAlert();
                    } else {
                        vm.mode = 'Rent';
                        vm.price = "";
                    }
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        function findRentalsByProduct(size,itemId) {
            //var size = vm.selectedOption;
            RentalService.findRentalsByProduct(itemId, size)
                .success(function (rentals) {
                    if (rentals === '0') {
                        //addAlert();
                    } else {
                        vm.rentals = rentals;
                    }
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        function postProdReview(review) {
            var userId = $rootScope.currentUser._id;
            review.by = userId;
            review.productId = vm.productDetail.ItemID;
            review.rating = vm.rating;
            ProductReviewService
                .createProductReview(userId, review)
                .success(function () {
                    $route.reload();
                })
                .error(function () {
                    vm.error = "Unable to post review";
                });
        }

        $scope.rating = 0;
        $scope.ratings = [{
            current: 0,
            max: 5
        }];

        $scope.getSelectedRating = function (rating) {
            vm.rating = rating;
        }

        init();
    }
})();