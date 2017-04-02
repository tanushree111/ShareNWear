module.exports = function(app) {
    var model = require("./Model/models.server")();
    require("./services/user.service.server.js")(app, model);
};