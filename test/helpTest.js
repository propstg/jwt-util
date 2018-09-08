const assert = require("assert");
const help = require("../commands/help");

describe("help.canProcess", () => {

    it("can process when 'help' argument provided", () => {
        const args = {"help": true};
        const canProcess = help.canProcess(args) ? true : false;
        assert.equal(canProcess, true);
    });

    it("cannot process when 'help' argument not provided", () => {
        const args = {"not help": "asdf"};
        const canProcess = help.canProcess(args) ? true : false;
        assert.equal(canProcess, false);
    });
});

describe("help.requiresKey", () => {

    it("does not require key", () => {
        assert.equal(help.requiresKey, false);
    });
});

describe("help.process", () => {

    it("returns help text", () => {
        const args = {"help": true};

        const response = help.process(args);

        assert.equal(response, `Available commands:\nDecode jwt: -d jwt\nVerify jwt: -v jwt -k secret.pem\nUpdate jwt: -u jwt -k secret.pem --ekeyName="[\'text\', \'to\', \'be\', \'evaluated\', \'and\', \'saved\']" --ckeyName2="no evaluation"`);
    });
});
