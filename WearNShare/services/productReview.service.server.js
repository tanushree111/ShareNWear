module.exports = function(app, model) {

    app.post('/api/user/:userId/:prodSize/productReview', createProductReview);
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
        var prodSize = req.params.prodSize;

        model.productModel.findProductByExtIdSize(review.productId, prodSize)
            .then(function(product){
                if (product.length > 0) {
                    review.productId = product[0].id;
                   return  model.productReviewModel.createProductReview(review);
                }
                else{
                    res.send(400);
                }
            })
            .then(function(status){
                res.sendStatus(200);
            })
            .catch(function(error){
                res.send(400);
            });
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