module.exports = function (app, model) {
    require("./services/user.service.server.js")(app, model);
    require("./services/message.service.server.js")(app, model);
    require("./services/userReview.service.server.js")(app, model);
};