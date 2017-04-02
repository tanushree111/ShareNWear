module.exports = function(app, model) {

    app.post('/api/user/:userId/productReview', createProductReview);
    app.get('/api/user/:userId/productReview', findProductReviewByUser);
    app.get('/api/productReview/all', findAllProductReview);
    app.get('/api/product/:productId/productReview', findReviewsByProduct);
    app.delete('/api/productReview/:reviewId', deleteProductReview);

    function findProductReviewByUser(req, res){
        var userId = req.params.userId;
        model
            .productReviewModel
            .findProductReviewByUser(userId)
            .then(
                function(reviews){
                    if(reviews) {
                        res.json(reviews);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllProductReview(req, res) {
        model
            .productReviewModel
            .findAllProductReview()
            .then(
                function (reviews) {
                    if (reviews.length > 0) {
                        res.json(reviews);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findReviewsByProduct(req, res){
        var pid = req.params.productId;
        model
            .productReviewModel
            .findReviewsByProduct(pid)
            .then(
                function(reviews){
                    if(reviews) {
                        res.json(reviews);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createProductReview(req, res){
        var review = req.body;
        var userId = req.params.userId;
        review.by = userId;
        model
            .productReviewModel
            .createProductReview(review)
            .then(
                function(newReview){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }


    function deleteProductReview(req, res){
        var rid = req.params.reviewId;
        model
            .productReviewModel
            .deleteProductReview(rid)
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