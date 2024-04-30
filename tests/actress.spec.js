import { strictEqual } from "assert";
import supertest from "supertest";
import app from "../dist/index.js";

describe("GET /actress", () => {
    let api = {};
    describe( "/", () => {
        
        before((done) => {
            const ajax = supertest(app).get("/actress");
            ajax.expect(200).end(function (err, res) {
                if (err) {
                    return done(err);
                }
                api = res.body.result;
                done();
            });
        });
        it("can get newest/puckup actresses", () => {
            strictEqual(Array.isArray(api), true);
            strictEqual(typeof(api[0].actor.name), "string");
        });
    });
});
