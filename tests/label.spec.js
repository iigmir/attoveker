import { strictEqual } from "assert";
import supertest from "supertest";
import app from "../dist/index.js";

describe("GET /label", () => {
    describe( "/", () => {
        let api = {};
        before((done) => {
            const ajax = supertest(app).get("/label");
            ajax.expect(200).end(function (err, res) {
                if (err) {
                    return done(err);
                }
                api = res.body.result;
                done();
            });
        });
        it("can get labels", () => {
            const item = api.find( ({ title }) => title === "大人のドラマ" );
            strictEqual(item.id, "9455");
            strictEqual(item.title, "大人のドラマ");
            strictEqual(item.text, "本格ドラマスタッフ大結集！ハイクオリティーなドラマ専門レーベル。男と女の日常、そして女の性を描く。");
        });
    });
    describe( "/9455", () => {
        let api = {};
        before((done) => {
            const ajax = supertest(app).get("/label/9455");
            ajax.expect(200).end(function (err, res) {
                if (err) {
                    return done(err);
                }
                api = res.body.result;
                done();
            });
        });
        it("can get videos", () => {
            strictEqual(api.length, 30);
        });
    });
});
