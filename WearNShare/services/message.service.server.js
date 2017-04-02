module.exports = function(app, model) {

    app.post('/api/message', createMessage);
    app.get('/api/user/:userId/sent', findMessageByUserId);
    app.get('/api/user/:userId/received', findMessageForUserId);
    app.delete('/api/message/:messageId', deleteMessage);

    function findMessageByUserId(req, res){
        var userId = req.params.userId;
        model
            .messageModel
            .findMessageByUserId(userId)
            .then(
                function(messages){
                    if(messages) {
                        res.json(messages);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findMessageForUserId(req, res){
        var userId = req.params.userId;
        model
            .messageModel
            .findMessageForUserId(userId)
            .then(
                function(messages){
                    if(messages) {
                        res.json(messages);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createMessage(req, res){
        var message = req.body;
        model
            .messageModel
            .createMessage(message)
            .then(
                function(newMessage){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }


    function deleteMessage(req, res){
        var mid = req.params.messageId;
        model
            .messageModel
            .deleteMessage(mid)
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