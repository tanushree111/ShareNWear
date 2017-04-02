(function () {
    angular
        .module('WearNShare')
        .factory("MessageService", MessageService);

    function MessageService($http) {
        var api = {
            "createMessage": createMessage,
            "findMessageByUserId": findMessageByUserId,
            "findMessageForUserId": findMessageForUserId,
            "deleteMessage": deleteMessage

        };
        return api;

        function createMessage(message) {
            var url = "/api/message";
            return $http.post(url, message);
        }

        function findMessageByUserId(userId) {
            var url = "/api/user/"+userId+"/sent";
            return $http.get(url);
        }

        function findMessageForUserId(userId) {
            var url = "/api/user/"+userId+"/received";
            return $http.get(url);
        }

        function deleteMessage(messageId) {
            var url = "/api/message/"+messageId;
            return $http.delete(url);

        }
    }

})();