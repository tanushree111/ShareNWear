(function () {
    angular
        .module('WearNShare')
        .factory("RentalService", RentalService);

    function RentalService($http) {
        var api = {
            "createRental": createRental,
            "findRental": findRental,
            "findRentalsByLender": findRentalsByLender,
            "findRentalsForRenter": findRentalsForRenter,
            "findRentalsByProduct": findRentalsByProduct,
            "deleteRental": deleteRental
        };

        return api;

        function createRental(rental) {
            var url = "/api/rental";
            return $http.post(url, rental);
        }

        function findRentalsByLender(userId) {
            var url = "/api/lender/"+userId+"/rental";
            return $http.get(url);
        }
        
        function findRentalsForRenter(userId) {
            var url = "/api/renter/"+userId+"/rental";
            return $http.get(url);
        }
        
        function findRentalsByProduct(productId, size) {
            var url = "/api/product/"+productId+"/size/"+size+"/rental";
            return $http.get(url);
        }

        function findRental(lenderId,productId,renterId) {
            var url = "/api/rental/lender/"+lenderId+"/product/"+productId+"/renter/"+renterId;
            return $http.get(url);
        }

        function deleteRental(lenderId,productId,renterId) {
            var url = "/api/rental/lender/"+lenderId+"/product/"+productId+"/renter/"+renterId;
            return $http.delete(url);

        }
    }

})();