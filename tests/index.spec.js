import { strictEqual } from "assert";
import supertest from "supertest";
import app from "../dist/index.js";

describe("GET /test", () => {
    it("should return a welcome message", (done) => {
        const ajax = supertest(app).get("/");
        ajax.expect(200).end(function (err, res) {
            if (err) return done(err);
            strictEqual(res.body.message, "Hello World!");
            done();
        });
    });
});

describe("GET /top", () => {
    let api = {};
    before((done) => {
        const ajax = supertest(app).get("/top");
        ajax.expect(200).end(function (err, res) {
            if (err) {
                return done(err);
            }
            api = res.body.result;
            done();
        });
    });
    describe( ".new_reserve", () => {
        it("can get latest videos", () => {
            strictEqual(Array.isArray(api.new_reserve), true);
        });
        it("can get videos infomation", () => {
            const video = api.new_reserve[0];
            strictEqual(typeof video.image, "string");
            strictEqual(typeof video.title, "string");
            strictEqual(typeof video.actor.name, "string");
            strictEqual(typeof video.actor.link, "string");
        });
    });
});
