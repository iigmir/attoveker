export interface ActorInterface {
    name: string
    link: string
    id: string
}

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

export function getActorDatas(ary: Element[]): ActorInterface[] {
    return ary.map( getActorData );
}
