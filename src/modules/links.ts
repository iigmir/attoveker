export interface BasicLinkInterface {
    name: string
    link: string
    id: string
}

/**
 * ========== GetDataType MODULES ==========
 */

enum GetDataType {
    Actor = "actor",
    Genre = "genre",
    Label = "label",
    Series = "series",
}
const get_selector = (type: GetDataType) => {
    switch (type) {
        case GetDataType.Actor: return `a[href*="actress/detail"]`;
        case GetDataType.Genre: return `a[href*="works/list/genre"]`;
        case GetDataType.Label: return `a[href*="works/list/label"]`;
        case GetDataType.Series: return `a[href*="works/list/series"]`;
        default: return "";
    }
};
const get_detection_regex = (type: GetDataType) => {
    switch (type) {
        case GetDataType.Actor: return /\/actress\/detail\/([0-9]+)(\?|)/g;
        case GetDataType.Genre: return /\/works\/list\/genre\/([0-9]+)(\?|)/g;
        case GetDataType.Label: return /\/works\/list\/label\/([0-9]+)(\?|)/g;
        case GetDataType.Series: return /\/works\/list\/series\/([0-9]+)(\?|)/g;
        default: return /\w/g;
    }
};
const get_replacing_regex = (type: GetDataType) => {
    switch (type) {
        case GetDataType.Actor: return /\/actress\/detail\//g;
        case GetDataType.Genre: return /\/works\/list\/genre\//g;
        case GetDataType.Label: return /\/works\/list\/label\//g;
        case GetDataType.Series: return /\/works\/list\/series\//g;
        default: return /\w/g;
    }
};

export function GetData(a: Element | HTMLAnchorElement, type: GetDataType): BasicLinkInterface {
    // Callbacks
    const get_dom = (a: Element | HTMLAnchorElement, selector: string): HTMLAnchorElement | null => {
        if( a.hasAttribute("href") ) {
            return a as HTMLAnchorElement;
        }
        return a.querySelector( selector );
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
    // Vars
    const dom = get_dom(a, get_selector(type));
    const detection_regex = get_detection_regex(type);
    const replacing_regex = get_replacing_regex(type);

    // Final actions...
    if( dom == null ) {
        return {
            name: "",
            link: "",
            id: "",
        };
    }
    return {
        name: dom.textContent ?? "",
        link: dom.href,
        id: get_text( detection_regex, dom.href ).replace( replacing_regex, "" ),
    };
}

/**
 * ========== ACTOR MODULES ==========
 */

/**
 * @example { name: "松下紗栄子", id: "351897", link: "https://attackers.net/actress/detail/351897" }
 */
export interface ActorInterface extends BasicLinkInterface {}

/**
 * getActorData('<a href="https://attackers.net/actress/detail/351897">松下紗栄子</a>')
 * // returns { name: "松下紗栄子", id: "351897", link: "https://attackers.net/actress/detail/351897" }
 */
export function getActorData(a: Element | HTMLAnchorElement): ActorInterface {
    return GetData(a, GetDataType.Actor);
}

export function getActorDatas(ary: Element[]): ActorInterface[] {
    return ary.map( getActorData );
}

/**
 * ========== GENRE MODULES ==========
 */

export interface GenreInterface extends BasicLinkInterface {}

export function getGenreData(a: Element | HTMLAnchorElement): GenreInterface {
    return GetData(a, GetDataType.Genre);
}
export function getGenreDatas(ary: Element[]): GenreInterface[] {
    return ary.map( getGenreData );
}

/**
 * ========== LABEL MODULES ==========
 */

export interface LabelInterface extends BasicLinkInterface {}

export function getLabelData(a: Element | HTMLAnchorElement): LabelInterface {
    return GetData(a, GetDataType.Label);
}
export function getLabelDatas(ary: Element[]): LabelInterface[] {
    return ary.map( getLabelData );
}

/**
 * ========== SERIES MODULES ==========
 */

export interface SeriesInterface extends BasicLinkInterface {}

export function getSeriesData(a: Element | HTMLAnchorElement): SeriesInterface {
    return GetData(a, GetDataType.Series);
}
export function getSeriesDatas(ary: Element[]): SeriesInterface[] {
    return ary.map( getSeriesData );
}
