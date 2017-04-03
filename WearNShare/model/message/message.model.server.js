module.exports = function (connection) {

    var api = {
        createMessage: createMessage,
        deleteMessage: deleteMessage,
        findMessageByUserId: findMessageByUserId,
        findMessageForUserId: findMessageForUserId
    };
    return api;


    function createMessage(msg) {
        return connection.query('INSERT INTO Messages SET ?', msg);
    }

    function deleteMessage(msgId) {
        return connection.query('DELETE FROM Messages  WHERE `id` = ?', msg);
    }

    function findMessageByUserId(userId) {
        return connection.query({
            sql: 'SELECT * FROM `Messages` m inner join `Users` u where m.sender = u.id and m.sender = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }

    function findMessageForUserId(userId) {
        return connection.query({
            sql: 'SELECT * FROM `Messages` m inner join `Users` u where m.receiver = u.id and m.receiver = ?',
            timeout: 40000, // 40s
            values: [userId]
        });
    }
};