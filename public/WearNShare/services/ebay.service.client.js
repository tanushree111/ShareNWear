(function () {
    angular
        .module("WearNShare")
        .factory("ebayService", ebayService);

    function ebayService($q, $http) {

        //delete $http.defaults.headers.common['X-Requested-With'];


        var api = {
            "findProductsByKeyWords": findProductsByKeyWords,
            "getProductDetail": getProductDetail,
            "getRelatedProducts" :getRelatedProducts
        };

        return api;

        function findProductsByKeyWords(keyword) {
            var url = "http://svcs.ebay.com/services/search/FindingService/v1";
            url += "?OPERATION-NAME=findItemsByKeywords";
            url += "&SERVICE-NAME=FindingService";
            url += "&SERVICE-VERSION=1.12.0";
            url += "&SECURITY-APPNAME=Tanushre-Sharedro-PRD-e45f30466-769092f5";
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&callback=JSON_CALLBACK";
            url += "&REST-PAYLOAD";
            url += "&keywords=" + keyword;
            url += "&paginationInput.entriesPerPage=50&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo";

            var deferred = $q.defer();
            $http.jsonp(url)
                .success(function (data) {
                    console.log('success');
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log('error');
                    deferred.reject();
                });

            return deferred.promise;
        }

        function getProductDetail(itemId) {
            // var itemId = "172387680591";
            var url = "http://open.api.ebay.com/shopping?";
            url += "callname=GetSingleItem";
            url += "&responseencoding=JSON";
            url += "&itemId=" + itemId;
            url += "&callbackname=JSON_CALLBACK";
            url += "&appid=Tanushre-Sharedro-PRD-e45f30466-769092f5&version=515";
            url += "&IncludeSelector=Details,Description,TextDescription";

            var deferred = $q.defer();
            $http.jsonp(url)
                .success(function (data) {
                    console.log('success');
                    deferred.resolve(data);
                })
                .error(function (data) {
                    console.log('error');
                    deferred.reject();
                });

            return deferred.promise;

        }

        function getRelatedProducts(itemId) {

            var url = "http://svcs.ebay.com/MerchandisingService?";
            url += "OPERATION-NAME=getRelatedCategoryItems&";
            url += "SERVICE-NAME=MerchandisingService&";
            url += "SERVICE-VERSION=1.12.0&";
            url += "CONSUMER-ID=Tanushre-Sharedro-PRD-e45f30466-769092f5&";
            url += "RESPONSE-DATA-FORMAT=JSON&";
            url += "callback=JSON_CALLBACK&";
            url += "REST-PAYLOAD&";
            url += "maxResults=10&";
            url += "itemId=" + itemId;

            var deferred = $q.defer();
            $http.jsonp(url)
                .success(function (data) {
                    console.log('success');
                    deferred.resolve(data);
                })
                .error(function (data) {
                    console.log('error');
                    deferred.reject();
                });

            return deferred.promise;

        }

    }

})();
