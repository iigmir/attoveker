import { strictEqual } from "assert";
import { GetLinkId, GetPagination } from "../dist/modules/utils.js";

describe("GetLinkId", () => {
    it("can get video", () => {
        strictEqual( GetLinkId("https://attackers.net/works/detail/ATVR053"), "ATVR053");
    });
    it("can get actress", () => {
        strictEqual( GetLinkId("https://attackers.net/actress/detail/354850"), "354850");
    });
    it("can get genre", () => {
        strictEqual( GetLinkId("https://attackers.net/works/list/genre/447"), "447");
    });
    it("can get series", () => {
        strictEqual( GetLinkId("https://attackers.net/works/list/series/2327"), "2327");
    });
    it("can get label", () => {
        strictEqual( GetLinkId("https://attackers.net/works/list/label/9455"), "9455");
    });
    it("can get date", () => {
        strictEqual( GetLinkId("https://attackers.net/works/list/date/2024-05-07"), "2024-05-07");
    });
    it("can get id only, with NO other infomation", () => {
        strictEqual( GetLinkId("https://attackers.net/works/detail/ATVR053?page_from=actress&sys_code=123456"), "ATVR053");
        strictEqual( GetLinkId("https://attackers.net/actress/detail/354850?utm_from=123456"), "354850");
        strictEqual( GetLinkId("https://attackers.net/works/list/date/2024-05-07?reply=no"), "2024-05-07");
    });
    it("can return an empty string for invalid detail", () => {
        strictEqual( GetLinkId("https://attackers.net/works/detail/#"), "");
        strictEqual( GetLinkId("https://attackers.net/actress#"), "");
    });
});

// pagination
describe("Pagination", () => {
    const cases = [
        ["全2作品中 1 〜 2 タイトルを表示", 1, { page: 1, total: 2, items: 2, start: 1, end: 2, }],
        ["全16作品中 1 〜 12 タイトルを表示", 1, { page: 1, total: 16, items: 12, start: 1, end: 12, }],
        ["全16作品中 13 〜 16 タイトルを表示", 2, { page: 2, total: 16, items: 4, start: 13, end: 16, }],
        ["全167人中 13 〜 24 人を表示", 2, { page: 2, total: 167, items: 12, start: 13, end: 24, }],
        ["全69人中 49 〜 60 人を表示", 5, { page: 5, total: 69, items: 12, start: 49, end: 60, }],
        ["全240人中 13 〜 24 人を表示", 2, { page: 2, total: 240, items: 12, start: 13, end: 24, }],
        ["全167人中 1 〜 12 人を表示", 1, { page: 1, total: 167, items: 12, start: 1, end: 12, }],
    ];
    it("can get current page", () => {
        cases.forEach( ([input, page, expected]) => {
            strictEqual( GetPagination(input, page).page, expected.page );
        });
    });
    it("can get total numbers", () => {
        cases.forEach( ([input, page, expected]) => {
            strictEqual( GetPagination(input, page).total, expected.total );
        });
    });
    it("can get items per page", () => {
        cases.forEach( ([input, page, expected]) => {
            strictEqual( GetPagination(input, page).items, expected.items );
        });
    });
    it("can get started item", () => {
        cases.forEach( ([input, page, expected]) => {
            strictEqual( GetPagination(input, page).start, expected.start );
        });
    });
    it("can get ended item", () => {
        cases.forEach( ([input, page, expected]) => {
            strictEqual( GetPagination(input, page).end, expected.end );
        });
    });
});
