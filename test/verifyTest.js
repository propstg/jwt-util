const assert = require("assert");
const verify = require("../commands/verify");

describe("verify.canProcess", () => {

    it("can process when 'v' argument provided", () => {
        const args = {"v": "asdf"};
        const canProcess = verify.canProcess(args) ? true : false;
        assert.equal(canProcess, true);
    });

    it("cannot process when 'v' argument not provided", () => {
        const args = {"not v": "asdf"};
        const canProcess = verify.canProcess(args) ? true : false;
        assert.equal(canProcess, false);
    });
});

describe("verify.requiresKey", () => {

    it("requires key", () => {
        assert.equal(verify.requiresKey, true);
    });
});

describe("verify.process", () => {

    it("verifies token and returns contents", () => {
        const args = {
            "v": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFkZXIiOnsiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifSwicGF5bG9hZCI6eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIsImV4cCI6MTcwMDAwMDAwMCwiZ3JvdXBzIjpbImFzZGYiLCJhc2RmMiJdfSwic2lnbmF0dXJlIjoiUTZMT29PaDBCMGxBU0xVV2F0SnZjVGZqYUpYSDhGRk1nZmRoZ0NRWTRvVSIsImlhdCI6MTUzNjM0MTI1M30.XvkqRZa9XBy_tmDjaOlYc83BV3hFlOCOldvTBahNmvg",
            "k": "./test/secret.pem"
        };

        const decodedToken = verify.process(args);

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

        assert.deepEqual(decodedToken, expectedToken);
    });

    it("throws exception when expired", () => {
        const args = {
            "v": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjF9.RID4t3CEYqt3KVmH53-I3uKxn7tXGNt1JvtUmQxVDQo",
            "k": "./test/secret.pem"
        };

        assert.throws(() => verify.process(args), {message: "jwt expired"});
    });

    it("throws exception when invalid signature", () => {
        const args = {
            "v": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFkZXIiOnsiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifSwicGF5bG9hZCI6eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIsImV4cCI6MTcwMDAwMDAwMCwiZ3JvdXBzIjpbImFzZGYiLCJhc2RmMiJdfSwic2lnbmF0dXJlIjoiUTZMT29PaDBCMGxBU0xVV2F0SnZjVGZqYUpYSDhGRk1nZmRoZ0NRWTRvVSIsImlhdCI6MTUzNjM0MTI1M30.XvkqRZa9XBy_tmDjaOlYc83BV3hFlOCOldvTBahNmvg",
            "k": "./test/secret2.pem"
        };

        assert.throws(() => verify.process(args), {message: "invalid signature"});
    });
});
