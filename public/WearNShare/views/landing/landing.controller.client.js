(function () {
    angular
        .module("WearNShare")
        .controller("LandingController", LandingController);

    function LandingController($location,$route, $rootScope, UserService) {
        var vm = this;
        vm.searchTerm = "";
        vm.search = search;
        vm.logout = logout;

        function search(){
            //alert("hi");
            $rootScope.keyword = vm.searchTerm;
            window.sessionStorage.keyword = vm.searchTerm;
            $location.url("/products");
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        //$location.url("/");
                        $route.reload();
                    });
        }

        function init() {

            if($rootScope.currentUser){
                vm.userId = $rootScope.currentUser._id;
            }
        }

        init();

    }

})();
