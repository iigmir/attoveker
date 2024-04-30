import { get_webpage } from "../api.js";
import { DomList } from "../modules/basic.js";
import { ActorInterface } from "../modules/links.js";
import { GetLinkId } from "../modules/utils.js";
import type { Request, Response } from "express";


class MainActresses extends DomList {
    dom_name = ".item .p-hoverCard"
    constructor(input: Document) {
        super();
        if( input ) {
            this.set_list_by_dom(input);
        }
    }
    releases(elem: Element) {
        /**
         * Finds and returns the link associated with a specific type of release from a list of links.
         * @param links links An array of HTMLAnchorElement objects representing links.
         * @param type_text The text used to identify the type of release.
         * @returns The URL of the release link, or an empty string if not found or if the link does not provide details.
         */
        const get_releases_link = (links: HTMLAnchorElement[], type_text: string) => {
            const matched_link = links.find(its => its.textContent?.includes(type_text));
            if( matched_link ) {
                const no_detail_given = matched_link.href.includes("/actress#") || matched_link.href.includes("/works/detail/#");
                if( no_detail_given ) {
                    return {
                        link: "",
                        id: "",
                    };
                }
                return {
                    link: matched_link.href,
                    id: GetLinkId(matched_link.href),
                };
            }
            return {
                link: "",
                id: "",
            };
        };
        const links = [...elem.querySelectorAll(".parts a")] as HTMLAnchorElement[];
        return {
            // 予約
            reservation: get_releases_link(links, "予約"),
            // 発売
            released: get_releases_link(links, "発売"),
            // 最新作品を見る
            newest: get_releases_link(links, "最新作品"),
        };
    }

    api() {
        return this.list.map( (its) => {
            const link_elem: HTMLAnchorElement | null = its.querySelector("a.img");
            const link = link_elem?.href ?? "";
            const actor: ActorInterface = {
                link: link,
                name: its.querySelector("p.name")?.textContent ?? "",
                en_name: its.querySelector("p.en")?.textContent ?? "",
                id: GetLinkId(link),
                avatar: its.querySelector("img")?.dataset.src ?? "",
            };
            const releases = this.releases(its);
            return { actor, releases };
        });
    }
}

export const main = async (req: Request, res: Response) => {
    const page = await get_webpage("https://attackers.net/actress");
    res.json({
        message: "success",
        result: (new MainActresses(page)).api(),
    });
};
