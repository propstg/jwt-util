const expect = require("chai").expect;
const update = require("../commands/update");
const jwt = require("jsonwebtoken");

describe("update.canProcess", () => {

    it("can process when 'u' argument provided", () => {
        const args = {"u": "asdf"};
        const canProcess = update.canProcess(args) ? true : false;
        expect(canProcess).to.be.true;
    });

    it("cannot process when 'u' argument not provided", () => {
        const args = {"not u": "asdf"};
        const canProcess = update.canProcess(args) ? true : false;
        expect(canProcess).to.be.false;
    });
});

describe("update.requiresKey", () => {

    it("requires key", () => {
        expect(update.requiresKey).to.be.true;
    });
});

describe("update.process", () => {

    it("returns same token when no actual updates provided", () => {
        const args = {
            "u": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFkZXIiOnsiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifSwicGF5bG9hZCI6eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIsImV4cCI6MTcwMDAwMDAwMCwiZ3JvdXBzIjpbImFzZGYiLCJhc2RmMiJdfSwic2lnbmF0dXJlIjoiUTZMT29PaDBCMGxBU0xVV2F0SnZjVGZqYUpYSDhGRk1nZmRoZ0NRWTRvVSIsImlhdCI6MTUzNjM0MTI1M30.XvkqRZa9XBy_tmDjaOlYc83BV3hFlOCOldvTBahNmvg",
            "k": "./test/secret.pem"
        };

        const newToken = update.process(args);
        const decodedToken = jwt.decode(newToken, {"complete": false});

        const expectedToken = {
            payload: { 
                sub: '1234567890',
                name: 'John Doe',
                iat: 151623902,
                exp: 1700000000,
                groups: [ 'asdf', 'asdf2' ]
            }
        };

        expect(decodedToken.payload).to.deep.equal(expectedToken.payload);
    });

    it("returns token with numeric update", () => {
        const args = {
            "u": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFkZXIiOnsiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifSwicGF5bG9hZCI6eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIsImV4cCI6MTcwMDAwMDAwMCwiZ3JvdXBzIjpbImFzZGYiLCJhc2RmMiJdfSwic2lnbmF0dXJlIjoiUTZMT29PaDBCMGxBU0xVV2F0SnZjVGZqYUpYSDhGRk1nZmRoZ0NRWTRvVSIsImlhdCI6MTUzNjM0MTI1M30.XvkqRZa9XBy_tmDjaOlYc83BV3hFlOCOldvTBahNmvg",
            "k": "./test/secret.pem",
            "cnewValue": 1000,
            "cexp": 1900000000
        };

        const decodedToken = jwt.decode(update.process(args), {"complete": false});

        expect(decodedToken.payload.exp).to.be.equal(1900000000);
        expect(decodedToken.payload.newValue).to.be.equal(1000);
    });

    it("returns token with string update", () => {
        const args = {
            "u": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFkZXIiOnsiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifSwicGF5bG9hZCI6eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIsImV4cCI6MTcwMDAwMDAwMCwiZ3JvdXBzIjpbImFzZGYiLCJhc2RmMiJdfSwic2lnbmF0dXJlIjoiUTZMT29PaDBCMGxBU0xVV2F0SnZjVGZqYUpYSDhGRk1nZmRoZ0NRWTRvVSIsImlhdCI6MTUzNjM0MTI1M30.XvkqRZa9XBy_tmDjaOlYc83BV3hFlOCOldvTBahNmvg",
            "k": "./test/secret.pem",
            "cnewValue": "new value",
            "cname": "John Dooe"
        };

        const decodedToken = jwt.decode(update.process(args), {"complete": false});

        expect(decodedToken.payload.newValue).to.be.equal("new value");
        expect(decodedToken.payload.name).to.be.equal("John Dooe");
    });

    it("returns token with eval'd updates", () => {
        const args = {
            "u": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFkZXIiOnsiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifSwicGF5bG9hZCI6eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIsImV4cCI6MTcwMDAwMDAwMCwiZ3JvdXBzIjpbImFzZGYiLCJhc2RmMiJdfSwic2lnbmF0dXJlIjoiUTZMT29PaDBCMGxBU0xVV2F0SnZjVGZqYUpYSDhGRk1nZmRoZ0NRWTRvVSIsImlhdCI6MTUzNjM0MTI1M30.XvkqRZa9XBy_tmDjaOlYc83BV3hFlOCOldvTBahNmvg",
            "k": "./test/secret.pem",
            "egroups": "['fdsa', 'fdsa2']",
            "enewValue": "'new value'"
        };

        const decodedToken = jwt.decode(update.process(args), {"complete": false});

        expect(decodedToken.payload.newValue).to.be.equal("new value");
        expect(decodedToken.payload.groups).to.deep.equal(['fdsa', 'fdsa2']);
    });

    it("throws exception when invalid signature", () => {
        const args = {
            "u": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFkZXIiOnsiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifSwicGF5bG9hZCI6eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIsImV4cCI6MTcwMDAwMDAwMCwiZ3JvdXBzIjpbImFzZGYiLCJhc2RmMiJdfSwic2lnbmF0dXJlIjoiUTZMT29PaDBCMGxBU0xVV2F0SnZjVGZqYUpYSDhGRk1nZmRoZ0NRWTRvVSIsImlhdCI6MTUzNjM0MTI1M30.XvkqRZa9XBy_tmDjaOlYc83BV3hFlOCOldvTBahNmvg",
            "k": "./test/secret2.pem"
        };

        expect(() => update.process(args)).to.throw("invalid signature");
    });
});
