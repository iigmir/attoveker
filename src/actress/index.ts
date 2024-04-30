import { get_webpage } from "../api.js";
import { DomList } from "../modules/basic.js";
import { ActorInterface } from "../modules/links.js";
import { GetLinkId } from "../modules/utils.js";
import type { Request, Response } from "express";

class ActressesDetail {
    document: Document;
    constructor(input: Document) {
        this.document = input;
    }
    private get_actor(): ActorInterface {
        // Images
        const GetLinkIdByImg = (url: string) => {
            // Split the URL by '/'
            const parts = url.split('/');
            // Get the second to last part of the URL
            const idPart = parts[parts.length - 2];
            // Extract the numeric ID using regex
            const match = idPart.match(/\d+/);
            // Check if a numeric ID is found
            if (match) {
                return match[0];
            } else {
                // Return null if no numeric ID is found
                return "";
            }
        };
        const img: HTMLImageElement | null = this.document.querySelector(".swiper-parent img.u-hidden--pc");
        const avatar = img?.dataset.src ?? "";
        const id = GetLinkIdByImg(avatar);

        // Name elements
        const name_elem = this.document.querySelector(".p-profile__title .top");
        const en_name_elem = this.document.querySelector(".p-profile__title .bottom");

        return {
            id: id,
            link: `https://attackers.net/actress/detail/${id}`,
            name: name_elem?.textContent ?? "",
            en_name: en_name_elem?.textContent ?? "",
            avatar: avatar,
        };
    }
    private get_profile() {
        const table = this.document.querySelectorAll(".p-profile__info .table .item");
        const result: string[][] = [];
        table.forEach(item => {
            result.push([
                item.querySelector(".th")?.textContent?.trim() ?? "",
                item.querySelector(".td")?.textContent?.trim() ?? ""
            ]);
        });
        return result;
    }
    api() {
        return {
            actor: this.get_actor(),
            profile: this.get_profile(),
        };
    }
}

export const detail = async (req: Request, res: Response) => {
    const page = await get_webpage("https://attackers.net/actress");
    res.json({
        message: "success",
        result: (new ActressesDetail(page)).api(),
    });
};

class MainActresses extends DomList {
    dom_name = ".item .p-hoverCard"
    constructor(input: Document) {
        super();
        if( input ) {
            this.set_list_by_dom(input);
        }
    }
    /**
     * Finds and returns the link associated with a specific type of release from a list of links.
     * @param links links An array of HTMLAnchorElement objects representing links.
     * @param type_text The text used to identify the type of release.
     * @returns The URL of the release link, or an empty string if not found or if the link does not provide details.
     */
    private get_releases_link(links: HTMLAnchorElement[], type_text: string) {
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
    }
    releases(elem: Element) {
        const links = [...elem.querySelectorAll(".parts a")] as HTMLAnchorElement[];
        return {
            // 予約
            reservation: this.get_releases_link(links, "予約"),
            // 発売
            released: this.get_releases_link(links, "発売"),
            // 最新作品を見る
            newest: this.get_releases_link(links, "最新作品"),
        };
    }
    private get_actor(its: Element): ActorInterface {
        const link_elem: HTMLAnchorElement | null = its.querySelector("a.img");
        const link = link_elem?.href ?? "";
        return {
            id: GetLinkId(link),
            link: link,
            name: its.querySelector("p.name")?.textContent ?? "",
            en_name: its.querySelector("p.en")?.textContent ?? "",
            avatar: its.querySelector("img")?.dataset.src ?? "",
        };
    }

    api() {
        return this.list.map( (its) => {
            const actor: ActorInterface = this.get_actor(its);
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
