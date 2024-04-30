import { GetLinkId } from "./utils.js";

/**
 * The basic link
 */
export interface BasicLinkInterface {
    name: string
    link: string
    id: string
}

/**
 * ========== GetDataType MODULES ==========
 */

export enum GetDataType {
    Actor = "actor",
    Genre = "genre",
    Label = "label",
    Series = "series",
}
export const get_selector = (type: GetDataType) => {
    switch (type) {
        case GetDataType.Actor: return `a[href*="actress/detail"]`;
        case GetDataType.Genre: return `a[href*="works/list/genre"]`;
        case GetDataType.Label: return `a[href*="works/list/label"]`;
        case GetDataType.Series: return `a[href*="works/list/series"]`;
        default: return "";
    }
};

/**
 * GetData(document.querySelector("a"), GetDataType.Actor)
 * // return { name:"優梨まいな", link: "https://attackers.net/actress/detail/353972", id: "353972" }`
 * @param a An anchor element or an element with anchor elements
 * @param type Enum of `GetDataType`
 * @returns Interface
 */
export function GetData(a: Element | HTMLAnchorElement, type: GetDataType): BasicLinkInterface {
    // Callbacks
    const get_dom = (a: Element | HTMLAnchorElement, selector: string): HTMLAnchorElement | null => {
        if( a.hasAttribute("href") ) {
            return a as HTMLAnchorElement;
        }
        return a.querySelector( selector );
    };
    // Vars
    const dom = get_dom(a, get_selector(type));

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
        id: GetLinkId( dom.href ),
    };
}

/**
 * ========== ACTOR MODULES ==========
 */

/**
 * @example { name: "松下紗栄子", id: "351897", link: "https://attackers.net/actress/detail/351897" }
 */
export interface ActorInterface extends BasicLinkInterface {
    /**
     * The actor's English romaji name. For cases when their romaji name attached.
     */
    en_name?: string
    /**
     * If they have their image avatar, why not attaching it?
     */
    avatar?: string
}

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
