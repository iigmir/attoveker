import { DomList } from "./basic.js";
import { ActorInterface, getActorData } from "./links.js";

/**
 * For any DOMs under `<div class="item"> <div class="c-card">`
 */
export class ImageCards extends DomList {
    dom_name = ".item .c-card"
    constructor(input: Document) {
        super();
        if( input ) {
            this.set_list_by_dom(input);
        }
    }
    get_id( regex = /whatever/g, input = "" ) {
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
        return get_text(regex, input);
    }
    get_actor(its: Element): ActorInterface {
        return getActorData(its);
    }
    api() {
        return this.list.map( (its) => {
            const link_dom: HTMLAnchorElement | null = its.querySelector("a");
            const image_dom: HTMLImageElement | null = its.querySelector("img.c-main-bg");
            const title_dom: HTMLParagraphElement | null = its.querySelector("p.text");
            const get_video_id = (link_dom: HTMLAnchorElement | null) : string => {
                if( link_dom ) {
                    this.get_id(/\/works\/detail\/([A-Z0-9]+)(\?|)/g, link_dom.href)
                        .replace(/\/works\/detail\//g, "");
                }
                return "";
            }
            return {
                image: image_dom ? image_dom.dataset.src : "",
                title: title_dom ? title_dom.textContent : "",
                link: link_dom ? link_dom.href : "",
                id: get_video_id(link_dom),
                actor: this.get_actor(its),
            };
        });
    }
}

/**
 * For any DOMs under `<div class="genre"> <a class="item">`
 */
export class SinglePageTags extends DomList {
    dom_name = ".genre a.item"
    constructor(input: Document) {
        super();
        if( input ) {
            this.set_list_by_dom(input);
        }
    }
    api() {
        return this.list.map( (its) => {
            // Get a digit number between `/genre` and `?`, OR `/series` and `?`.
            const regex_rule = /(?:\/genre\/|\/series\/)(\d+)(\?|)/g;
            const link: string = (its as HTMLAnchorElement).href ?? "";
            const match = link.match(regex_rule);
            const path = match ? match[0] : "";
            return {
                text: its.querySelector("*.title")?.textContent ?? "",
                amount: its.querySelector("*.num")?.textContent?.replace( /\D/g, "" ) ?? "",
                code: path.replace( /\D/g, "" ),
                link: link,
            };
        });
    }
}
