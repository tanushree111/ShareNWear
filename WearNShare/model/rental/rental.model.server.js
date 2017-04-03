module.exports = function (connection) {

    var api = {
        createRental: createRental,
        findRental: findRental,
        findRentalsByLender: findRentalsByLender,
        findRentalsForRenter: findRentalsForRenter,
        findRentalsByProduct: findRentalsByProduct,
        deleteRental: deleteRental
    };
    return api;


    function createRental(rental) {
        return connection.query('INSERT INTO Rentals SET ?', rental);
    }

    function findRental(lenderId,productId,renterId) {
        return connection.query({
            sql: 'SELECT * FROM `Rentals`WHERE `lender` = ? AND `productId` = ? AND `renter` = ?',
            timeout: 40000, // 40s
            values: [lenderId, productId, renterId]
        });
    }

    function findRentalsByLender(userId) {
        return connection.query({
            sql: 'SELECT * FROM `Rentals` WHERE `lender` = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }

    function findRentalsForRenter(userId) {
        return connection.query({
            sql: 'SELECT * FROM `Rentals` WHERE `renter` = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }

    function findRentalsByProduct(productId) {
        return connection.query({
            sql: 'SELECT * FROM `Rentals` WHERE `productId` = ?',
            timeout: 40000, // 40s
            values: [productId]
        });
    }

    function deleteRental(lenderId,productId,renterId) {
        return connection.query({
            sql: 'DELETE FROM `Rentals` WHERE `lender` = ? AND `productId` = ? AND `renter` = ?',
            timeout: 40000, // 40s
            values: [lenderId, productId, renterId]
        });
    }

}