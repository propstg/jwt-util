const expect = require("chai").expect;
const decode = require("../commands/decode");

describe("decode.canProcess", () => {

    it("can process when 'd' argument provided", () => {
        const args = {"d": "asdf"};
        const canProcess = decode.canProcess(args) ? true : false;
        expect(canProcess).to.be.true;
    });

    it("cannot process when 'd' argument not provided", () => {
        const args = {"not d": "asdf"};
        const canProcess = decode.canProcess(args) ? true : false;
        expect(canProcess).to.be.false;
    });
});

describe("decode.requiresKey", () => {

    it("does not require key", () => {
        expect(decode.requiresKey).to.be.false;
    });
});

describe("decode.process", () => {

    it("decodes and returns token", () => {
        const args = {"d": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFkZXIiOnsiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifSwicGF5bG9hZCI6eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIsImV4cCI6MTcwMDAwMDAwMCwiZ3JvdXBzIjpbImFzZGYiLCJhc2RmMiJdfSwic2lnbmF0dXJlIjoiUTZMT29PaDBCMGxBU0xVV2F0SnZjVGZqYUpYSDhGRk1nZmRoZ0NRWTRvVSIsImlhdCI6MTUzNjM0MTI1M30.XvkqRZa9XBy_tmDjaOlYc83BV3hFlOCOldvTBahNmvg"};

        const decodedToken = decode.process(args);

        const expectedToken = {
            header: {
                alg: 'HS256', 
                typ: 'JWT'
            },
            payload: { 
                sub: '1234567890',
                name: 'John Doe',
                iat: 151623902,
                exp: 1700000000,
                groups: [ 'asdf', 'asdf2' ]
            },
            signature: 'Q6LOoOh0B0lASLUWatJvcTfjaJXH8FFMgfdhgCQY4oU',
            iat: 1536341253
        };

        expect(decodedToken).to.deep.equal(expectedToken);
    });
});
