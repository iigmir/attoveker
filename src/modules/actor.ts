/**
 * For example, `<a href="https://attackers.net/actress/detail/351897">松下紗栄子</a>` will be:
 * ```json
 * { name: "松下紗栄子", id: "351897", link: "https://attackers.net/actress/detail/351897" }
 * ```
 */
export interface ActorInterface {
    name: string
    link: string
    id: string
}

/**
 * getActorData('<a href="https://attackers.net/actress/detail/351897">松下紗栄子</a>')
 * // returns { name: "松下紗栄子", id: "351897", link: "https://attackers.net/actress/detail/351897" }
 */
export function getActorData(a: Element): ActorInterface {
    const dom: HTMLAnchorElement | null = a.querySelector('a[href*="actress/detail"]');
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
    return {
        name: dom?.textContent ?? "",
        link: dom?.href ?? "",
        id: get_text(/\/actress\/detail\/([0-9]+)(\?|)/g, dom?.href ?? "").replace(/\/actress\/detail\//g, ""),
    };
}

/**
 * Get all actors!
 * @param ary Many DOMs!
 * @returns Many actors!
 */
export function getActorDatas(ary: Element[]): ActorInterface[] {
    return ary.map( getActorData );
}
