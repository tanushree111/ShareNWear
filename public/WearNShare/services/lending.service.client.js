(function () {
    angular
        .module('WearNShare')
        .factory("LendingService", LendingService);

    function LendingService($http) {
        var api = {
            "createLending": createLending,
            "findLending": findLending,
            "findLendingsByLender": findLendingsByLender,
            "findLendingsByProduct": findLendingsByProduct,
            "updateLending": updateLending,
            "deleteLending": deleteLending
        };

        return api;

        function createLending(lending) {
            var url = "/api/lending";
            return $http.post(url, lending);
        }

        function findLendingsByLender(userId) {
            var url = "/api/lender/"+userId+"/lending";
            return $http.get(url);
        }

        function findLendingsByProduct(productId, size) {
            var url = "/api/product/"+productId+"/size/"+size+"/lending";
            return $http.get(url);
        }

        function findLending(lenderId,productId) {
            var url = "/api/lending/lender/"+lenderId+"/product/"+productId;
            return $http.get(url);
        }

        function deleteLending(lenderId,productId) {
            var url = "/api/lending/lender/"+lenderId+"/product/"+productId;
            return $http.delete(url);

        }
        function updateLending(lenderId,productId,lending) {
            var url = "/api/lending/lender/"+lenderId+"/product/"+productId;
            return $http.put(url,lending);

        }
    }

})();