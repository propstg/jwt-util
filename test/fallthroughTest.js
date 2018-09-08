const expect = require("chai").expect;
const fallthrough = require("../commands/fallthrough");

describe("fallthrough.canProcess", () => {

    it("always returns true", () => {
        const args = {"v": "asdf"};
        const canProcess = fallthrough.canProcess(args) ? true : false;
        expect(canProcess).to.be.true;
    });
});

describe("fallthrough.requiresKey", () => {

    it("does not require key", () => {
        expect(fallthrough.requiresKey).to.be.false;
    });
});

describe("fallthrough.process", () => {

    it("throws exception when process called", () => {

        expect(() => fallthrough.process({})).to.throw("Unable to find matching command. See --help for information.");
    });
});
