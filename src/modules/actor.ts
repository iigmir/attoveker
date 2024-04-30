export interface BasicLinkInterface {
    name: string
    link: string
    id: string
}

/**
 * For example, `<a href="https://attackers.net/actress/detail/351897">松下紗栄子</a>` will be:
 * ```json
 * { name: "松下紗栄子", id: "351897", link: "https://attackers.net/actress/detail/351897" }
 * ```
 */
export interface ActorInterface extends BasicLinkInterface {}

enum GetDataType {
    Actor = "actor",
    Genre = "genre",
}

export function GetData(a: Element | HTMLAnchorElement, type: GetDataType): BasicLinkInterface {
    const get_selector = (type: GetDataType) => {
        switch (type) {
            case GetDataType.Actor: return `a[href*="actress/detail"]`;
            case GetDataType.Genre: return `a[href*="works/list/genre"]`;
            default: return "";
        }
    };
    const get_detection_regex = (type: GetDataType) => {
        switch (type) {
            case GetDataType.Actor: return /\/actress\/detail\/([0-9]+)(\?|)/g;
            case GetDataType.Genre: return /\/works\/list\/genre\/([0-9]+)(\?|)/g;
            default: return /\w/g;
        }
    };
    const get_replacing_regex = (type: GetDataType) => {
        switch (type) {
            case GetDataType.Actor: return /\/actress\/detail\//g;
            case GetDataType.Genre: return /\/works\/list\/genre\//g;
            default: return /\w/g;
        }
    };
    const get_dom = (a: Element | HTMLAnchorElement): HTMLAnchorElement | null => {
        if( a.hasAttribute("href") ) {
            return a as HTMLAnchorElement;
        }
        return a.querySelector( get_selector(type) );
    };
    const get_text = (regex = /whatever/g, input = "") => {
        // Use the regex to extract the ID from the text
        const match = input.match(regex);
        // Check if a match is found
        if (match) {
            // Return the captured the ID
            return match[0] ? match[0] : "";
        } else {
            // Return null if no match is found
            return "";
        }
    };
    const dom = get_dom(a);
    const input_text = dom?.href ?? "";
    const id = get_text( get_detection_regex(type), input_text).replace( get_replacing_regex(type), "");

    // Final actions...
    if( dom == null ) {
        return {
            name: "",
            link: "",
            id: id,
        };
    }
    return {
        name: dom.textContent ?? "",
        link: dom.href,
        id: id,
    };
}

/**
 * getActorData('<a href="https://attackers.net/actress/detail/351897">松下紗栄子</a>')
 * // returns { name: "松下紗栄子", id: "351897", link: "https://attackers.net/actress/detail/351897" }
 */
export function getActorData(a: Element | HTMLAnchorElement): ActorInterface {
    return GetData(a, GetDataType.Actor);
}

export function getGenreData(a: Element | HTMLAnchorElement): BasicLinkInterface {
    return GetData(a, GetDataType.Genre);
}
export function getGenreDatas(ary: Element[]): BasicLinkInterface[] {
    return ary.map( getGenreData );
}

/**
 * Get all actors!
 * @param ary Many DOMs!
 * @returns Many actors!
 */
export function getActorDatas(ary: Element[]): ActorInterface[] {
    return ary.map( getActorData );
}
