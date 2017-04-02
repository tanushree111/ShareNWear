(function () {
    angular
        .module("WearNShare")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/landing/landing.view.client.html",
                controller: "LandingController",
                controllerAs: "model"
            })
            .when("/products", {
                templateUrl: "views/products/productList.view.client.html",
                controller: "ProductListController",
                controllerAs: "model"
            })
            .when("/productDetail/:eid", {
                templateUrl: "views/products/productDetail.view.client.html",
                controller: "ProductDetailController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })

            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/edit", {
                templateUrl: "views/user/profile-edit.view.client.html",
                controller: "ProfileEditController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/user/:uid/seller/:sid", {
                templateUrl: "views/user/seller-profile.view.client.html",
                controller: "SellerProfileController",
                controllerAs: "model",

            })
            .when ("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                //resolve: { loggedin: checkLoggedin }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: "/login"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin')
            .success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            })
            .error(function (err){
                $location.url('/login');
            });
        return deferred.promise;
    }

    function checkAdmin($q, UserService, $location) {
        var deferred = $q.defer();
        UserService
            .checkAdmin()
            .success(
                function (user) {
                    if(user != '0') {
                        $location.url('/admin');
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/login");
                    }
                }
            );
        return deferred.promise;
    }


})();