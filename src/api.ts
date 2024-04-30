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

/**
 * `id` accepts either:
 * "a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa"
 * 
 * Which means:
 * "あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"
 * 
 * @see https://learnjapanesewithyuko.com/characters/hiragana-chart
 * @param id 
 * @param page 
 * @returns 
 */
export const get_actress_by_kana = async (id = "", page = "1") => {
    function get_api(id = "", page = "1") {
        const params = new URLSearchParams({ page });
        const kanas = ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa"];
        if( kanas.includes(id) ) {
            return `${API_HOST}/actress/${id}?${params.toString()}`
        }
        return `${API_HOST}/actress`;
    }
    const api = get_api(id, page);
    return get_webpage(api);
};

/**
 * @see https://attackers.net/actress/detail/356451
 * @see https://attackers.net/actress
 * @param id 
 * @param page 
 * @returns 
 */
export const get_actress = async (id = "", page = "1") => {
    const params = new URLSearchParams({ page });
    const api = id ? `${API_HOST}/actress/detail/${id}?${params.toString()}` : `${API_HOST}/actress`;
    return get_webpage(api);
};
