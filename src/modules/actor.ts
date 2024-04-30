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

/**
 * getActorData('<a href="https://attackers.net/actress/detail/351897">松下紗栄子</a>')
 * // returns { name: "松下紗栄子", id: "351897", link: "https://attackers.net/actress/detail/351897" }
 */
export function getActorData(a: Element | HTMLAnchorElement): ActorInterface {
    const get_dom = (a: Element | HTMLAnchorElement): HTMLAnchorElement | null => {
        if( a.hasAttribute("href") ) {
            return a as HTMLAnchorElement;
        }
        return a.querySelector(`a[href*="actress/detail"]`);
    }
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
    const id = get_text(/\/actress\/detail\/([0-9]+)(\?|)/g, dom?.href ?? "").replace(/\/actress\/detail\//g, "");
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

export function getGeneralData(a: Element | HTMLAnchorElement): BasicLinkInterface {
    const get_dom = (a: Element | HTMLAnchorElement): HTMLAnchorElement | null => {
        if( a.hasAttribute("href") ) {
            return a as HTMLAnchorElement;
        }
        return a.querySelector(`a[href*="actress/detail"]`);
    }
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
    const id = get_text(/\/works\/list\/genre\/([0-9]+)(\?|)/g, dom?.href ?? "").replace(/\/works\/list\/genre\//g, "");
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
export function getGeneralDatas(ary: Element[]): BasicLinkInterface[] {
    return ary.map( getGeneralData );
}

/**
 * Get all actors!
 * @param ary Many DOMs!
 * @returns Many actors!
 */
export function getActorDatas(ary: Element[]): ActorInterface[] {
    return ary.map( getActorData );
}
