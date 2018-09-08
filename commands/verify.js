const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = {
	canProcess: args => args["v"],
	requiresKey: true,
	process: args => console.dir(jwt.verify(args["v"], fs.readFileSync(args["k"], "utf8").trim()))
}
