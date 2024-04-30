import { PaginationInterface } from "./interfaces.js";

/**
 * GetLinkId("https://attackers.net/works/detail/ATVR053") // returns "ATVR053"
 * @see /tests/utils.spec.js, `GetLinkId` instance
 * @param url URL. Of course.
 * @returns ID from given URL
 */
export function GetLinkId(url = "") {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const queryIndex = lastPart.indexOf("?");
    const id = queryIndex !== -1 ? lastPart.substring(0, queryIndex) : lastPart;
    if( id === "#" || id === "actress#" ) {
        return "";
    }
    return id;
}

export function GetPagination(text: string, page: number): PaginationInterface {
    const regex = /全(\d+)(人|作品)中 (\d+) 〜 (\d+) (人|タイトル)を表示/;
    const match = text.match(regex);
    const result = {
        page: page,
        total: 0,
        items: 0,
        start: 0,
        end: 0,
    };
    if( !match ) {
        return result;
    }
    const [source_text, total, unit, start, end, unit2] = match;
    result.total = parseInt(total, 10);
    result.start = parseInt(start, 10);
    result.end = parseInt(end, 10);
    result.items = (result.end - result.start) + 1;
    return result;
}

export function GetPaginationByDom(elem: Element, page: number) {
    return GetPagination( String(elem.textContent), page);
}
