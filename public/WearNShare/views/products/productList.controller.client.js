(function () {
    angular
        .module("WearNShare")
        .controller("ProductListController", ProductListController);


    function ProductListController($location,ebayService,$rootScope,usSpinnerService,ngProgressLite, UserService) {
        var vm = this;
        vm.searchProducts = searchProducts;

        vm.searchTerm = "";
        vm.search = search;
        vm.logout = logout;

        vm.startSpin = function() {
           // usSpinnerService.spin('spinner-1');
            ngProgressLite.start();
        };

        vm.stopSpin = function() {
           // usSpinnerService.stop('spinner-1');
            ngProgressLite.done();
        };


        function search(){
            vm.searchTerm = vm.searchTerm.replace(/\s/g,",")
            searchProducts(vm.searchTerm)
            $rootScope.keyword = vm.searchTerm;
            window.sessionStorage.keyword = vm.searchTerm;
           // $location.url("/products");
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

        function init(){
            if(!$rootScope)
            {
                //var encodedKey = $rootScope.keyword.replace(/\s/g,"%20");
                var encodedKey = $rootScope.keyword.replace(/\s/g,",");
                searchProducts(encodedKey);
            }
            else if(window.sessionStorage.keyword !=undefined){
                var encodedKey = window.sessionStorage.keyword.replace(/\s/g,",");
                searchProducts(encodedKey);
            }
            if($rootScope){
                if($rootScope.currentUser){
                    vm.userId = $rootScope.currentUser._id;
                }
            }
        }

        init();


        function searchProducts(keyword) {
            vm.startSpin();
            ebayService.findProductsByKeyWords(keyword)
                .then(function (products) {
                        vm.stopSpin();
                    vm.products = products.findItemsByKeywordsResponse[0].searchResult[0].item;
                        //res.send(website);
                       // console.log(console.log('error'););
                    },
                    function (error) {
                       //
                        vm.stopSpin();
                        console.log('error');

                    }
                )

        }

    }
})();
