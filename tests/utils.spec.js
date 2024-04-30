import { strictEqual } from "assert";
import { GetLinkId } from "../dist/modules/utils.js";

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
