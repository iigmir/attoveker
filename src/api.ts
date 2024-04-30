import { JSDOM } from "jsdom";

const API_HOST = "https://attackers.net";

function get_document(ajax: string, input: string) {
    return new JSDOM(ajax, {
        url: input,
        referrer: API_HOST,
        contentType: "text/html",
    });
}

export const get_webpage = async (input = API_HOST) => {
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

export const get_label = async (id = "", page = "1") => {
    const params = new URLSearchParams({ page });
    const api = id ? `${API_HOST}/works/list/label/${id}?${params.toString()}` : `${API_HOST}/works/label`;
    return get_webpage(api);
};
