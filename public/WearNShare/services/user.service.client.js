(function () {
    angular
        .module('WearNShare')
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findAllUser" : findAllUser,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser,
            "addFollowersForUserId" : addFollowersForUserId,
            "addLikesForUserId" : addLikesForUserId,
            "login" : login,
            "logout" : logout,
            "register": register,
            "checkAdmin": checkAdmin

        };
        return api;

        function findAllUser() {
            var url = "/api/user/all";
            return $http.get(url);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, newUser) {
            var url = "/api/user/"+userId;
            return $http.put(url, newUser);
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url);
        }

        function addFollowersForUserId(userId, sellerId) {
            var url = "/api/user/"+userId+"/seller/"+sellerId+"/follow";
            return $http.put(url);
        }

        function addLikesForUserId(userId, sellerId) {
            var url = "/api/user/"+userId+"/seller/"+sellerId+"/like";
            return $http.put(url);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }
        function findEbayProd() {
            return $http.get("/api/ebay");
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }


    }

})();