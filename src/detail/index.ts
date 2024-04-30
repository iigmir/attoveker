import { get_webpage } from "../api.js";
import type { Request, Response } from "express";
import type { VideoDetailInterface } from "./interfaces.js";
import { ActorInterface, getActorDatas, getGenreDatas, BasicLinkInterface } from "../modules/actor.js";

function get_interface_info(page: Document, result_data: VideoDetailInterface) {
    const SELECTORS = {
        TITLE: ".p-workPage__title",
        DESCRIPTION: ".p-workPage__text",
        TIME: "収録時間",
        SERIES: "シリーズ",
        ID: "品番",
        PRICE: "価格",
        RELEASE: "発売日",
        ACTORS: "女優",
        DIRECTOR: "監督",
        GENRE: "ジャンル",
    };
    const get_dom_text = (input: Document, selector: string): string => {
        const dom = input.querySelector(selector);
        const result = dom?.textContent?.trim();
        return result ? result : "";
    };
    /**
     * Get video URL
     * @param input DOM
     * @returns Video URL
     */
    const get_video = (input: Document): string => {
        const dom = input.querySelector("video");
        return dom ? dom.src : "";
    };
    /**
     * get_table_item(table, "監督") // 芳賀栄太郎
     * @param table
     * @param selector
     */
    const get_table_item = (table: Element[], selector: string): string => {
        const find_item_in_table = table.find((elem) => {
            const th = elem.querySelector(".th");
            return th?.textContent?.includes(selector);
        });
        if (find_item_in_table) {
            const d = find_item_in_table.querySelector(".td");
            return d ? d.textContent?.replace("DVD", "").replace("---", "").trim() ?? "" : "";
        }
        return "";
    };
    const get_links_data = (table: Element[], selector: string): ActorInterface[] | BasicLinkInterface[] => {
        const find_item_in_table = table.find((elem) => {
            const th = elem.querySelector(".th");
            return th?.textContent?.includes(selector);
        });
        if (find_item_in_table) {
            const dom = find_item_in_table.querySelector(".td");
            switch (selector) {
                case SELECTORS.ACTORS: return dom ? getActorDatas([...dom.querySelectorAll("a")]) : [];
                case SELECTORS.GENRE : return dom ? getGenreDatas([...dom.querySelectorAll("a")]) : [];
                default: return [];
            }
        }
        return [];
    };

    const video_datas = [...page.querySelectorAll(".p-workPage__table .item")];

    // Return...
    return {
        link: result_data.result.link ?? "",
        title: get_dom_text(page, SELECTORS.TITLE),
        description: get_dom_text(page, SELECTORS.DESCRIPTION),
        preview: get_video(page),
        time: get_table_item(video_datas, SELECTORS.TIME),
        series: get_table_item(video_datas, SELECTORS.SERIES),
        id: get_table_item(video_datas, SELECTORS.ID),
        price: get_table_item(video_datas, SELECTORS.PRICE),
        release: get_table_item(video_datas, SELECTORS.RELEASE),
        director: get_table_item(video_datas, SELECTORS.DIRECTOR),
        actors: get_links_data(video_datas, SELECTORS.ACTORS),
        genre: get_links_data(video_datas, SELECTORS.GENRE),
    };
}

export const main = async (req: Request, res: Response) => {
    const page = await get_webpage(`https://attackers.net/works/detail/${req.params.id}`);
    const result_data: VideoDetailInterface = {
        message: "unknown",
        params: req.params,
        result: {
            link: `https://attackers.net/works/detail/${req.params.id}`,
            id: req.params.id,
            time: "",
            title: "",
            description: "",
            price: "",
            preview: "",
            series: "",
            release: "",
            director: "",
            actors: [],
            genre: [],
        },
    };

    const error_text = page.querySelector(".text01");
    const content_not_found = error_text && error_text.textContent && error_text.textContent.match("404 Not Found");
    if( content_not_found ) {
        // If 404, return error
        result_data.message = "video not found";
        res.status(404);
    } else {
        // Otherwise, retrive info
        result_data.message = "success";
        result_data.result = get_interface_info(page, result_data);
    }
    
    res.json(result_data);
};
