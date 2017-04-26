module.exports = function (connection) {

    var api = {
        createLending: createLending,
        findLending: findLending,
        findLendingsByLender: findLendingsByLender,
        findLendingsByProduct: findLendingsByProduct,
        deleteLending: deleteLending,
        updateLending: updateLending
    };
    return api;


    function createLending(lending) {
        var newLending = {
            lender: lending.lender.id,
            productId: lending.productId,
            price: lending.price,
            quantity: lending.quantity
        };
        return connection.query('INSERT INTO Lendings SET ?', newLending);
    }

    function findLending(lenderId,productId) {
        return connection.query({
            sql: 'SELECT * FROM `Lendings`WHERE `lender` = ? AND `productId` = ?',
            timeout: 40000, // 40s
            values: [lenderId, productId]
        });
    }

    function findLendingsByLender(userId) {
        return connection.query({
            sql: 'SELECT * FROM `Lendings` l,`Users` u,`Products` p WHERE l.lender = u.id AND l.productId = p.id AND `lender` = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }

    function findLendingsByProduct(productId) {
        return connection.query({
            sql: 'SELECT * FROM `Lendings` l inner join `Users` u WHERE l.lender = u.id AND `productId` = ? AND `available` = ?',
            timeout: 40000, // 40s
            values: [productId, true]
        });
    }

    function deleteLending(lenderId,productId) {
        return connection.query({
            sql: 'DELETE FROM `Lendings` WHERE `lender` = ? AND `productId` = ?',
            timeout: 40000, // 40s
            values: [lenderId, productId]
        });
    }

    function updateLending(lenderId,productId,lending) {
        var newUpdate = {
            price: lending.price,
            quantity: lending.quantity,
            //availableFrom: lending.availableFrom,
            //availableTo: lending.availableTo,
            available: lending.available
        };
        return connection.query({
            sql: 'UPDATE `Lendings` SET ? WHERE `lender` = ? AND `productId` = ?',
            timeout: 40000, // 40s
            values: [newUpdate, lenderId, productId]
        });
    }

}