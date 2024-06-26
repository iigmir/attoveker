import { DomList } from "./basic.js";
import { getActorData, ActorInterface } from "./links.js";
import { GetLinkId } from "./utils.js";

export interface ImageCardsInterface {
    image: string
    title: string
    link: string
    id: string
    actor: ActorInterface
}
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
    api(): ImageCardsInterface[] {
        const mapping_callback = (its: Element): ImageCardsInterface => {
            const link_dom: HTMLAnchorElement | null = its.querySelector("a");
            const image_dom: HTMLImageElement | null = its.querySelector("img.c-main-bg");
            const title_dom: HTMLParagraphElement | null = its.querySelector("p.text");
            return {
                image: image_dom ? String(image_dom.dataset.src) : "",
                title: title_dom ? title_dom.textContent ?? "" : "",
                link: link_dom ? link_dom.href : "",
                id: GetLinkId(link_dom ? link_dom.href : ""),
                actor: getActorData(its),
            };
        };
        return this.list.map( mapping_callback );
    }
}

export interface SinglePageTagsInterface {
    amount: string
    code: string
    link: string
    text: string
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
    api(): SinglePageTagsInterface[] {
        const mapping_callback = (its: Element): SinglePageTagsInterface => {
            // Get a digit number between `/genre` and `?`, OR `/series` and `?`.
            const regex_rule = /(?:\/genre\/|\/series\/)(\d+)(\?|)/g;
            const link: string = (its as HTMLAnchorElement).href ?? "";
            const match = link.match(regex_rule);
            const path = match ? match[0] : "";
            return {
                text: its.querySelector("*.title")?.textContent ?? "",
                amount: its.querySelector("*.num")?.textContent?.replace(/\D/g, "") ?? "",
                code: path.replace(/\D/g, ""),
                link: link,
            };
        };
        return this.list.map( mapping_callback );
    }
}
