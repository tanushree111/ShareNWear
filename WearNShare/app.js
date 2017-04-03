module.exports = function (app, model) {
    require("./services/user.service.server.js")(app, model);
    require("./services/message.service.server.js")(app, model);
    require("./services/userReview.service.server.js")(app, model);
    require("./services/productReview.service.server.js")(app, model);
    require("./services/lending.service.server.js")(app, model);
    require("./services/rental.service.server.js")(app, model);
};