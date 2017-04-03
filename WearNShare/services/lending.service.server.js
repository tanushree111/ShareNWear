module.exports = function (app, model) {

    app.post('/api/lending', createLending);
    app.get('/api/lender/:userId/lending', findLendingsByLender);
    app.get('/api/product/:productId/size/:size/lending', findLendingsByProduct);
    app.get('/api/lending/lender/:lenderId/product/:productId', findLending);
    app.put('/api/lending/lender/:lenderId/product/:productId', updateLending);
    app.delete('/api/lending/lender/:lenderId/product/:productId', deleteLending);

    function findLendingsByLender(req, res) {
        var userId = req.params.userId;
        model
            .lendingModel
            .findLendingsByLender(userId)
            .then(
                function (lendings) {
                    if (lendings) {
                        res.json(lendings);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findLendingsByProduct(req, res) {
        var pid = req.params.productId;
        var size = req.params.size;
        model
            .productModel
            .findProductByExtIdSize(pid, size)
            .then(
                function (products) {
                    if (products) {
                        // call lending with product id
                        model
                            .lendingModel
                            .findLendingsByProduct(products[0].id)
                            .then(
                                function (lendings) {
                                    if (lendings) {
                                        res.json(lendings);
                                    } else {
                                        res.send('0');
                                    }
                                },
                                function (error) {
                                    res.sendStatus(400).send(error);
                                }
                            );
                        //
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findLending(req, res) {
        var lid = req.params.lenderId;
        var pid = req.params.productId;

        model
            .lendingModel
            .findLending(lid, pid)
            .then(
                function (lending) {
                    if (lending) {
                        res.json(lending);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createLending(req, res) {
        var lending = req.body;
        model
            .productModel
            .findProductByExtIdSize(lending.extId, lending.size)
            .then(
                function (product) {
                    if (product.size > 0) {
                        // Product already exists
                        lending.productId = product.id;
                        model
                            .lendingModel
                            .createLending(lending)
                            .then(
                                function (newLending) {
                                    //
                                    //
                                    res.sendStatus(200);
                                },
                                function (error) {
                                    res.sendStatus(400).send(error);
                                }
                            );
                    } else {
                        var product = {};
                        product.name = lending.name;
                        product.description = lending.description;
                        product.category = lending.category;
                        product.extId = lending.extId;
                        product.size = lending.size;

                        model
                            .productModel
                            .createProduct(product)
                            .then(
                                function (newProduct) {
                                    if (newProduct) {

                                        // Product created before lending creation
                                        lending.productId = newProduct.insertId;
                                        model
                                            .lendingModel
                                            .createLending(lending)
                                            .then(
                                                function (newLending) {
                                                    //
                                                    //
                                                    res.sendStatus(200);
                                                },
                                                function (error) {
                                                    res.sendStatus(400).send(error);
                                                }
                                            );
                                    } else {
                                        res.sendStatus(400).send(error);
                                    }

                                },
                                function (error) {
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function deleteLending(req, res) {
        var lid = req.params.lenderId;
        var pid = req.params.productId;
        model
            .lendingModel
            .deleteLending(lid, pid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateLending(req, res) {
        var lid = req.params.lenderId;
        var pid = req.params.productId;
        model
            .lendingModel
            .updateLending(lid, pid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


}