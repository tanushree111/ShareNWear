module.exports = function (connection) {

    var api = {
        createProduct: createProduct,
        deleteProduct: deleteProduct,
        findProductById: findProductById,
        findProductByExtIdSize: findProductByExtIdSize,
        findAllProducts: findAllProducts
    };
    return api;

    function findAllProducts() {
        return connection.query({
            sql: 'SELECT * FROM `Products`',
            timeout: 40000 // 40s
        });
    }

    function createProduct(product) {
        return connection.query('INSERT INTO Products SET ?', product);
    }

    function deleteProduct(productId) {
        return connection.query({
            sql: 'DELETE FROM Products  WHERE `id` = ?',
            timeout: 40000, // 40s
            values: [productId]
        });
    }

    function findProductByExtIdSize(extId, size) {
        return connection.query({
            sql: 'SELECT * FROM `Products` WHERE `extId` = ? AND `size` = ?',
            timeout: 40000, // 40s
            values: [extId, size]
        });
    }

    function findProductById(productId) {
        return connection.query({
            sql: 'SELECT * FROM `Products` WHERE `id` = ?',
            timeout: 40000, // 40s
            values: [productId]
        });
    }

};