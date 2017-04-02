(function () {
    angular
        .module("WearNShare")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("ProfileEditController", ProfileEditController)
        .controller("SellerProfileController", SellerProfileController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;
        vm.findEbayProd = findEbayProd;

        function login(user) {
            if (!user || !user.username || !user.password) {
                vm.error = "Username and Paassword are mandatory";
            } else {
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            if($rootScope.currentUser.role=="ADMIN"){
                                $location.url("/admin");
                            }
                            else{
                                $location.url("/");
                            }
                        },
                        function (err) {
                            vm.error = "Invalid Username and Password";
                        });
            }
        }

        function findEbayProd() {

           /* UserService
                .findEbayProd()
                .then(
                    function (response) {
                        vm.error = "Ok";
                    },
                    function (err) {
                        vm.error = "Invalid Username and Password";
                    });*/

        }


    }

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;
        vm.confirmPassword="";

        function register(user) {
            if (!user || !user.username || !user.password || !vm.confirmPassword || !user.email) {
                vm.error = "Username, Password and Email are mandatory";
            } else if (user.password === vm.confirmPassword) {
                //user.registeredOn = new Date();
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user");
                        },
                        function (err) {
                            vm.error = "Unable to register";
                        })

            } else {
                vm.error = "Passwords in both fields don't match";
            }
        }
    }

    function ProfileController($location, $routeParams, $rootScope, UserService, RentalService, UserReviewService, MessageService) {
        var vm = this;
        vm.userId = $rootScope.currentUser.id;
        vm.logout = logout;
        function init() {
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function () {
                    vm.error = "Unable to fetch user";
                })
           MessageService.findMessageForUserId(vm.userId)
                .success(function (msgs) {
                    vm.inbox = msgs;
                })
                .error(function () {
                    vm.error = "Unable to fetch inbox messages";
                });

            MessageService.findMessageByUserId(vm.userId)
                .success(function (msgs) {
                    vm.sent = msgs;
                })
                .error(function () {
                    vm.error = "Unable to fetch sent messages";
                });

            UserReviewService.findUserReviewForUserId(vm.userId)
                .success(function (reviews) {
                    vm.forReviews = reviews;
                })
                .error(function () {
                    vm.error = "Unable to fetch reviews on you";
                });
            UserReviewService.findUserReviewByUserId(vm.userId)
                .success(function (reviews) {
                    vm.byReviews = reviews;
                })
                .error(function () {
                    vm.error = "Unable to fetch reviews by you";
                });

                /*
            RentalService.findRentalsByLender(vm.userId)
                .success(function (lents) {
                    vm.lents = lents;
                })
                .error(function () {
                    vm.error = "Unable to fetch other items lent by you";
                });
            RentalService.findRentalsByRenter(vm.userId)
                .success(function (rents) {
                    vm.rents = rents;
                })
                .error(function () {
                    vm.error = "Unable to fetch other items rented by you";
                });
           */
        }
        init();


        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .success(function () {
                    $location.url("/user");
                })
                .error(function () {
                    vm.error = "Unable to update profile";
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

    function ProfileEditController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        ;
        vm.updateUser = updateUser;
        vm.logout = logout;
        function init() {
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function () {
                    vm.error = "Unable to fetch user";
                });
        }

        init();


        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .success(function () {
                    $location.url("/user");
                })
                .error(function () {
                    vm.error = "Unable to update profile";
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

    function SellerProfileController($location, $route, $routeParams, $rootScope, UserService, UserReviewService, RentalService, MessageService, $scope, ebayService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.sellerId = $routeParams['sid'];
        vm.logout = logout;
        vm.addFollower = addFollower;
        vm.addLike = addLike;
        vm.postReview = postReview;
        vm.sendMessage = sendMessage;
        vm.toggleShowReview = toggleShowReview;
        vm.getOtherProducts = getOtherProducts;
        vm.otherProducts = [];
        vm.rating = 0;
        function init() {
            vm.showReview = false;
            UserService.findUserById(vm.sellerId)
                .success(function (seller) {
                    vm.seller = seller;
                })
                .error(function () {
                    vm.error = "Unable to fetch user";
                });
            UserReviewService.findUserReviewForUserId(vm.sellerId)
                .success(function (reviews) {
                    vm.sellerReviews = reviews;
                })
                .error(function () {
                    vm.error = "Unable to fetch reviews on seller";
                });
            getOtherProducts();
        }

        function toggleShowReview(show) {
            vm.showReview = show;
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

        function addFollower() {
            UserService
                .addFollowersForUserId(vm.userId, vm.sellerId)
                .success(function () {
                    $route.reload();
                })
                .error(function () {
                    vm.error = "Unable to follow";
                });
        }

        function addLike() {
            UserService
                .addLikesForUserId(vm.userId, vm.sellerId)
                .success(function () {
                    $route.reload();
                })
                .error(function () {
                    vm.error = "Unable to like";
                });
        }

        function postReview(review) {
            review.by = vm.userId;
            review.for = vm.sellerId;
            review.rating = vm.rating;
            UserReviewService
                .createUserReview(review)
                .success(function () {
                    $route.reload();
                })
                .error(function () {
                    vm.error = "Unable to post review";
                });
        }

        function sendMessage(message) {
            message.by = vm.userId;
            message.for = vm.sellerId;
            MessageService
                .createMessage(message)
                .success(function () {
                    $route.reload();
                })
                .error(function () {
                    vm.error = "Unable to send message";
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

        function getOtherProducts() {
            RentalService.findRentalsByLender(vm.sellerId)
                .success(function (lents) {
                    vm.lents = lents;
                    if(lents){
                        for(i in lents){
                            if(lents[i].available){
                                ebayService.getProductDetail(lents[i].productId)
                                    .then(function (product) {
                                            vm.otherProducts.push(product.Item);
                                        },
                                        function (error) {
                                            //
                                            console.log('error');
                                        }
                                    )
                            }
                        }
                    }
                })
                .error(function () {
                    vm.error = "Unable to fetch other items lent by you";
                });

        }

        init();
    }
})();