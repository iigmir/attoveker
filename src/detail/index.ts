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
        const elem = input.querySelector(selector);
        const result = elem?.textContent?.trim();
        return result ?? "";
    };
    /**
     * Get video URL
     * @param input DOM
     * @returns Video URL
     */
    const get_video = (input: Document): string => {
        const elem = input.querySelector("video");
        return elem ? elem.src : "";
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
            const elem = find_item_in_table.querySelector(".td");
            return elem ? elem.textContent?.trim() ?? "" : "";
        }
        return "";
    };
    /**
     * get_links_data(`<div><a>1</a><a>2</a><a>3</a></div>`, `SELECTORS.WHATEVER`)
     * // returns `[{1},{2},{3}]`
     * @param table 
     * @param selector 
     * @returns 
     */
    const get_links_data = (table: Element[], selector: string): BasicLinkInterface[] => {
        const selected_item = table.find((elem) => {
            const th = elem.querySelector(".th");
            return th?.textContent?.includes(selector);
        });
        if (!selected_item) {
            return [];
        }
        const links = selected_item.querySelectorAll("a");
        switch (selector) {
            case SELECTORS.ACTORS: return getActorDatas([...links]);
            case SELECTORS.GENRE : return getGenreDatas([...links]);
            case SELECTORS.LABEL : return getLabelDatas([...links]);
            case SELECTORS.SERIES: return getSeriesDatas([...links]);
            default: return [];
        }
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

