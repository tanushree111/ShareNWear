(function () {
    angular
        .module("WearNShare")
        .controller("ProductDetailController", ProductDetailController);


    function ProductDetailController($location, $route, $routeParams, ebayService, ProductReviewService, UserService, $sce, RentalService, LendingService, $rootScope, $scope) {
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
        vm.createLending = createLending;
        vm.createRental = createRental;
        vm.findRentalsByProduct = findRentalsByProduct;
        vm.findLendingsByProduct = findLendingsByProduct;
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

        function createLending() {
            var lending = {};
            lending.extId = vm.productDetail.ItemID;
            lending.name = vm.productDetail.Title;
            lending.category = vm.productDetail.PrimaryCategoryName;
            lending.description = vm.productDetail.Description;
            lending.size = vm.selectedOption;
            lending.price = vm.price;
            lending.quantity = 1;
            var dateToday = new Date();
            lending.availableFrom = dateToday;
            dateToday.setDate(dateToday.getDate() +  15);
            lending.availableTo = dateToday;
            lending.lender = $rootScope.currentUser;
            if (lending.availableFrom > lending.availableTo) {
                vm.error = "Invalid date range";
            }
            else{
            LendingService.createLending(lending)
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
        }

        function createRental(lending) {
            var rental = {};
            rental.lender = lending.lender;
            rental.productId = lending.productId;
            rental.rentedQty = 1;
            var dateToday = new Date();
            rental.rentedFrom = dateToday;
            dateToday.setDate(dateToday.getDate() +  10);
            rental.rentedTo = dateToday;
            rental.renter = $rootScope.currentUser.id;
            if (rental.rentedFrom < lending.availableFrom || rental.rentedFrom > lending.availableTo
                || rental.rentedTo < lending.availableFrom || rental.rentedTo > lending.availableTo
                || rental.rentedFrom > rental.rentedTo) {
                vm.error = "Invalid date range";
            }
            else{
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

        function findLendingsByProduct(size,itemId) {
            //var size = vm.selectedOption;
            LendingService.findLendingsByProduct(itemId, size)
                .success(function (lendings) {
                    if (lendings === '0') {
                        //addAlert();
                    } else {
                        vm.lendings = lendings;
                    }
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        function postProdReview(review) {
            var userId = $rootScope.currentUser._id;
            review.reviewer = userId;
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