const assert = require("assert");
const fallthrough = require("../commands/fallthrough");

describe("fallthrough.canProcess", () => {

    it("always returns true", () => {
        const args = {"v": "asdf"};
        const canProcess = fallthrough.canProcess(args) ? true : false;
        assert.equal(canProcess, true);
    });
});

describe("fallthrough.requiresKey", () => {

    it("does not require key", () => {
        assert.equal(fallthrough.requiresKey, false);
    });
});

describe("fallthrough.process", () => {

    it("throws exception when process called", () => {
        assert.throws(() => fallthrough.process({}), {message: "Unable to find matching command. See --help for information."});
    });
});
