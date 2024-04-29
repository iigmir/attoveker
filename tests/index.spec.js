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

describe("GET /detail", () => {
    describe( "/ADN551", () => {
        let api = {};
        before((done) => {
            const ajax = supertest(app).get("/detail/ADN551");
            ajax.expect(200).end(function (err, res) {
                if (err) {
                    return done(err);
                }
                api = res.body.result;
                done();
            });
        });
        it("can get videos infomation", () => {
            strictEqual(api.title, "人妻寝取られ仮面パーティー");
            strictEqual(api.description, "大口の取引先が倒産。資金繰りに行き詰った僕は、藁にも縋る思いで梅田さんに助けを求めた。すると彼は「起業家が集まるパーティーに行ってみないか？」と提案。なんだか怪しいとは思ったが、そんな事を言ってる場合ではない。彼に連れられて会場に入ると、そこは異様な雰囲気に包まれていた。参加者全員が仮面を付け、目の前で行われているセックス愉しんで観ている。次は誰がセックスするんだろう…そう思っていたら、妻によく似た女性が観衆の前でセックスをはじめた。");
            // strictEqual(api.director, "きとるね川口");
            // strictEqual(api.actors.length, 1);
            // strictEqual(api.genre.length, 4);
            // strictEqual(api.id, "ADN551");
            // strictEqual(api.time, "160");
            // strictEqual(api.price, "4598");
            // strictEqual(api.preview, "https://cc3001.dmm.co.jp/litevideo/freepv/a/adn/adn00551/adn00551_dm_w.mp4");
            // strictEqual(api.series, "");
        });
    });
    describe( "/ATID141", () => {
        let api = {};
        before((done) => {
            const ajax = supertest(app).get("/detail/ATID141");
            ajax.expect(200).end(function (err, res) {
                if (err) {
                    return done(err);
                }
                api = res.body.result;
                done();
            });
        });
        it("can get videos infomation", () => {
            strictEqual(api.title, "アナル奴隷白書");
            strictEqual(api.description, "さや(真琴)は父と2人で幸せに暮らしていた。そんな日常に暗雲が立ち籠め始める…。【6千万円】騙されて多額の借金を背負ってしまった父と娘。逃げ出す事もできずに娘は男達の巨大な肉棒を捩じ込まれて…。");
            // strictEqual(api.director, "芳賀栄太郎");
            // strictEqual(api.actors.length, 1);
            // strictEqual(api.genre.length, 1);
            // strictEqual(api.id, "ATID141");
            // strictEqual(api.time, "110");
            // strictEqual(api.price, "2940");
            // strictEqual(api.preview, "https://cc3001.dmm.co.jp/litevideo/freepv/a/ati/atid141/atid141_dmb_s.mp4");
            // strictEqual(api.series, "アナル奴隷白書");
        });
    });
    describe( "/ATKD370", () => {
        let api = {};
        before((done) => {
            const ajax = supertest(app).get("/detail/ATKD370");
            ajax.expect(200).end(function (err, res) {
                if (err) {
                    return done(err);
                }
                api = res.body.result;
                done();
            });
        });
        it("can get videos infomation", () => {
            strictEqual(api.title, "中年オヤジの唾液まみれのベロキス性交に堕ちた美女8時間");
            strictEqual(api.description, "美女の脳を溶かす、オヤジたちのベロキス性交。美女は犯されながらキスする顔が一番エロい。接吻美女20名収録。");
            // strictEqual(api.director, "");
            // strictEqual(api.actors.length, 20);
            // strictEqual(api.genre.length, 3);
            // strictEqual(api.id, "ATKD370");
            // strictEqual(api.time, "480");
            // strictEqual(api.price, "3498");
            // strictEqual(api.preview, "https://cc3001.dmm.co.jp/litevideo/freepv/a/atk/atkd00370/atkd00370_dm_w.mp4");
            // strictEqual(api.series, "");
        });
    });
});
