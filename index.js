#!/usr/bin/env node

const processors = [
    require("./commands/decode"),
    require("./commands/verify"),
    require("./commands/update"),
    require("./commands/help"),
    require("./commands/fallthrough")
];

const args = require("minimist")(process.argv.slice(2));

try {
    let response = processors
        .filter(processor => processor.canProcess(args))
        .map(processor => {
            if (processor.requiresKey && !args["k"]) {
                throw Error("Secret key file is required for this operation. -k filename-containing-secret-key");
            }
            return processor;
        })[0].process(args);

    if (typeof response === "string") {
        console.log(response);
    } else {
        console.dir(response);
    }
} catch(e) {
    console.error("Error: ", e.message);
}
