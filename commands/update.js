const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = {
    canProcess: args => args["u"],
    requiresKey: true,
    process: args => {
		const key = fs.readFileSync(args["k"], "utf8").trim();
        let decodedToken = jwt.verify(args["u"], key);
        for (arg in args) {
            if (arg.charAt(0) == "e") {
                decodedToken.payload[arg.substr(1)] = eval(args[arg]);
            } else if (arg.charAt(0) == "c") {
                decodedToken.payload[arg.substr(1)] = args[arg];
            }
        }

        return jwt.sign(decodedToken, key);
    }
}
