module.exports = function(app, model) {

    app.post('/api/rental', createRental);
    app.get('/api/lender/:userId/rental', findRentalsByLender);
    app.get('/api/renter/:userId/rental', findRentalsByRenter);
    app.get('/api/product/:productId/size/:size/rental', findRentalsByProduct);
    app.get('/api/rental/:rentalId', findRentalById);
    app.put('/api/rental/:rentalId', updateRental);
    app.delete('/api/rental/:rentalId', deleteRental);

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

    function findRentalsByRenter(req, res){
        var userId = req.params.userId;
        model
            .rentalModel
            .findRentalsByRenter(userId)
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
            .rentalModel
            .findRentalsByProduct(pid, size)
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

    function findRentalById(req, res){
        var rid = req.params.rentalId;
        model
            .rentalModel
            .findRentalById(rid)
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

    function updateRental(req, res){
        var rental = req.body;
        var rid = req.params.rentalId;
        model
            .rentalModel
            .updateRental(rid, rental)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteRental(req, res){
        var rid = req.params.rentalId;
        model
            .rentalModel
            .deleteRental(rid)
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