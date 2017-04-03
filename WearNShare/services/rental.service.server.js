module.exports = function(app, model) {

    app.post('/api/rental', createRental);
    app.get('/api/lender/:userId/rental', findRentalsByLender);
    app.get('/api/renter/:userId/rental', findRentalsForRenter);
    app.get('/api/product/:productId/size/:size/rental', findRentalsByProduct);
    app.get('/api/rental/lender/:lenderId/product/:productId/renter/:renterId', findRental);
    app.delete('/api/rental/lender/:lenderId/product/:productId/renter/:renterId', deleteRental);

    function findRentalsByLender(req, res){
        var userId = req.params.userId;
        model
            .rentalModel
            .findRentalsByLender(userId)
            .then(
                function(rentals){
                    if(rentals) {
                        res.json(rentals);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findRentalsForRenter(req, res){
        var userId = req.params.userId;
        model
            .rentalModel
            .findRentalsForRenter(userId)
            .then(
                function(rentals){
                    if(rentals) {
                        res.json(rentals);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findRentalsByProduct(req, res){
        var pid = req.params.productId;
        var size = req.params.size;
        model
            .productModel
            .findProductByExtIdSize(pid, size)
            .then(
                function(product){
                    if(product) {
                        // call rental with product id
                        model
                            .rentalModel
                            .findRentalsByProduct(product.id)
                            .then(
                                function(rentals){
                                    if(rentals) {
                                        res.json(rentals);
                                    }else{
                                        res.send('0');
                                    }
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                        //
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findRental(req, res){
        var lid = req.params.lenderId;
        var pid = req.params.productId;
        var rid = req.params.renterId;

        model
            .rentalModel
            .findRental(lid,pid,rid)
            .then(
                function(rental){
                    if(rental) {
                        res.json(rental);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createRental(req, res){
        var rental = req.body;
        model
            .rentalModel
            .createRental(rental)
            .then(
                function(newRental){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function deleteRental(req, res){
        var lid = req.params.lenderId;
        var pid = req.params.productId;
        var rid = req.params.renterId;
        model
            .rentalModel
            .deleteRental(lid,pid,rid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


}