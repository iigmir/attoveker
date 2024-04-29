import { get_webpage } from "../api.js";
import { DomList, ImageCards } from "../modules.js";
import type { Request, Response } from "express";

export class SlideCards extends DomList {
    /**
     * <div class="swiper-wrapper"> <div class="swiper-slide">
     */
    dom_name = ".swiper-wrapper .swiper-slide"
    constructor(input: Document) {
        super();
        if( input ) {
            this.set_list_by_dom(input);
        }
    }
    api() {
        return this.list.map( (its) => {
            const img: HTMLImageElement|null = its.querySelector("img.pc");
            return {
                image: img?.dataset?.src,
                link: its.querySelector("a")?.href ?? "",
            };
        });
    }
}

export class TopPageTags extends DomList {
    dom_name = ".p-tag__list .item a"
    constructor(input: Document) {
        super();
        if( input ) {
            this.set_list_by_dom(input);
        }
    }
    api() {
        const list = this.list as HTMLAnchorElement[];
        const get_link = (its: HTMLAnchorElement) => {
            const url = new URL(its.href);
            return {
                text: url.searchParams.get("keyword"),
            };
        };
        const get_code = (its: HTMLAnchorElement) => {
            // Get a digit number between `/genre` and `?`, OR `/series` and `?`.
            const regex_rule = /(?:\/genre\/|\/series\/)(\d+)(\?|)/g;
            const match = its.href.match(regex_rule);
            const path = match ? match[0] : "";
            return {
                text: its.textContent,
                amount: null,
                code: path.replace( /\D/g, "" )
            };
        };
        const searches = list.filter( its => its.href.includes("/list?keyword") ).map( get_link );
        const genres = list.filter( its => its.href.includes("/list/genre/") ).map( get_code );
        const series = list.filter( its => its.href.includes("/list/series/") ).map( get_code );
        return { searches, genres, series };
    }
}

export const main = async (req: Request, res: Response) => {
    const page = await get_webpage("https://attackers.net/top");
    res.json({
        message: "success",
        result: {
            new_reserve: (new ImageCards(page)).api(),
            slides: (new SlideCards(page)).api(),
            tags: (new TopPageTags(page)).api(),
        }
    });
};
