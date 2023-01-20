module.exports = (app) => {
    require("./v1/user.cjs")(app);
    require("./v1/lambda.cjs")(app);
};
