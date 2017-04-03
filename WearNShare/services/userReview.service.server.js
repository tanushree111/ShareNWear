module.exports = function (app, model) {

    app.post('/api/userReview', createUserReview);
    app.get('/api/userReview/userReviewBy/:userId', findUserReviewByUserId);
    app.get('/api/userReview/userReviewFor/:userId', findUserReviewForUserId);
    app.get('/api/userReview/all', findAllUserReview);;
    app.delete('/api/userReview/:reviewId', deleteUserReview);

    function findUserReviewByUserId(req, res) {
        var userId = req.params.userId;
        model
            .userReviewModel
            .findUserReviewByUserId(userId)
            .then(
                function (reviews) {
                    if (reviews) {
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

    function findAllUserReview(req, res) {
        model
            .userReviewModel
            .findAllUserReview()
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

    function findUserReviewForUserId(req, res) {
        var userId = req.params.userId;
        model
            .userReviewModel
            .findUserReviewForUserId(userId)
            .then(
                function (reviews) {
                    if (reviews) {
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

    function createUserReview(req, res) {
        var review = req.body;

        model
            .userReviewModel
            .createUserReview(review)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }


    function deleteUserReview(req, res) {
        var rid = req.params.reviewId;
        model
            .userReviewModel
            .deleteUserReview(rid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.send(error);
                }
            );
    }
};