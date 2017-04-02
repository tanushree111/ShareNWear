(function () {
    angular
        .module('WearNShare')
        .factory("RentalService", RentalService);

    function RentalService($http) {
        var api = {
            "createRental": createRental,
            "findRentalById": findRentalById,
            "findRentalsByLender": findRentalsByLender,
            "findRentalsByRenter": findRentalsByRenter,
            "findRentalsByProduct": findRentalsByProduct,
            "updateRental": updateRental,
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
        
        function findRentalsByRenter(userId) {
            var url = "/api/renter/"+userId+"/rental";
            return $http.get(url);
        }
        
        function findRentalsByProduct(productId, size) {
            var url = "/api/product/"+productId+"/size/"+size+"/rental";
            return $http.get(url);
        }

        function findRentalById(rentalId) {
            var url = "/api/rental/"+rentalId;
            return $http.get(url);
        }

        function updateRental(rentalId, newRental) {
            var url = "/api/rental/"+rentalId;
            return $http.put(url, newRental);
        }

        function deleteRental(rentalId) {
            var url = "/api/rental/"+rentalId;
            return $http.delete(url);

        }
    }

})();