const jwt = require("jsonwebtoken");

module.exports = {
    canProcess: args => args["d"],
    requiresKey: false,
    process: args => jwt.decode(args["d"], {complete: false})
}
