import { JSDOM } from "jsdom";

function get_document(ajax: string, input: string) {
    const api_root = "https://attackers.net";
    return new JSDOM(ajax, {
        url: input,
        referrer: api_root,
        contentType: "text/html",
    });
}

export const get_webpage = async (input = "https://attackers.net") => {
    try {
        const ajax = await fetch(input).then( r => r.text() );
        const dom = get_document(ajax, input);
        return dom.window.document;
    } catch (error) {
        console.error(error);
        const dom = get_document("", input);
        return dom.window.document;
    }
};
