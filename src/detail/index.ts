import { get_webpage } from "../api.js";
import type { Request, Response } from "express";
import type { VideoDetailInterface } from "./interfaces.js";
import {
    BasicLinkInterface,
    getActorDatas,
    getGenreDatas,
    getLabelDatas,
    getSeriesDatas,
} from "../modules/links.js";

/**
 * Get info
 * @param page 
 * @param link 
 * @returns 
 */
function get_interface_info(page: Document, link: string) {
    const SELECTORS = {
        TITLE: ".p-workPage__title",
        DESCRIPTION: ".p-workPage__text",
        ACTORS: "女優",
        RELEASE: "発売日",
        SERIES: "シリーズ",
        LABEL: "レーベル",
        GENRE: "ジャンル",
        DIRECTOR: "監督",
        ID: "品番",
        TIME: "収録時間",
        PRICE: "価格",
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
            return d ? d.textContent?.trim() ?? "" : "";
        }
        return "";
    };
    const get_links_data = (table: Element[], selector: string): BasicLinkInterface[] => {
        const find_item_in_table = table.find((elem) => {
            const th = elem.querySelector(".th");
            return th?.textContent?.includes(selector);
        });
        if (find_item_in_table) {
            const dom = find_item_in_table.querySelector(".td");
            function get_interfaces(dom: Element | null, callback: Function): BasicLinkInterface[] {
                return dom ? callback([...dom.querySelectorAll("a")]) : [];
            }
            switch (selector) {
                case SELECTORS.ACTORS: return get_interfaces(dom, getActorDatas);
                case SELECTORS.GENRE : return get_interfaces(dom, getGenreDatas);
                case SELECTORS.LABEL : return get_interfaces(dom, getLabelDatas);
                case SELECTORS.SERIES: return get_interfaces(dom, getSeriesDatas);
                default: return [];
            }
        }
        return [];
    };
    const additional_replace = (input_text: string, selector: string): string => {
        switch (selector) {
            case SELECTORS.ID: return input_text.replace("DVD", "");
            case SELECTORS.TIME: return input_text.replace(/\D/g, "");
            case SELECTORS.PRICE: return input_text.replace(/\D/g, "");
            case SELECTORS.DIRECTOR: return input_text.replace("---", "");
            // Remain as it is
            default: return input_text;
        }
    };

    const video_datas = [...page.querySelectorAll(".p-workPage__table .item")];

    // Return...
    return {
        // Metadata
        link: link,
        title: get_dom_text(page, SELECTORS.TITLE),
        description: get_dom_text(page, SELECTORS.DESCRIPTION),
        preview: get_video(page),
        // Infos
        actors: get_links_data(video_datas, SELECTORS.ACTORS),
        release: additional_replace(get_table_item(video_datas, SELECTORS.RELEASE), SELECTORS.RELEASE),
        series: get_links_data(video_datas, SELECTORS.SERIES),
        label: get_links_data(video_datas, SELECTORS.LABEL),
        genre: get_links_data(video_datas, SELECTORS.GENRE),
        director: additional_replace(get_table_item(video_datas, SELECTORS.DIRECTOR), SELECTORS.DIRECTOR),
        id: additional_replace(get_table_item(video_datas, SELECTORS.ID), SELECTORS.ID),
        time: additional_replace(get_table_item(video_datas, SELECTORS.TIME), SELECTORS.TIME),
        price: additional_replace(get_table_item(video_datas, SELECTORS.PRICE), SELECTORS.PRICE),
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
            release: "",
            director: "",
            series: [],
            actors: [],
            genre: [],
            label: [],
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
        result_data.result = get_interface_info(page, result_data.result.link);
    }
    
    res.json(result_data);
};

