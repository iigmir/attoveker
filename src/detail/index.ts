import { get_webpage } from "../api.js";
import type { Request, Response } from "express";
import type { VideoDetailInterface } from "./interfaces.js";
import { ActorInterface, getActorDatas } from "../modules/actor.js";

export const main = async (req: Request, res: Response) => {
    const page = await get_webpage(`https://attackers.net/works/detail/${req.params.id}`);
    const result_data: VideoDetailInterface = {
        message: "",
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
            actors: [],
            genre: [],
        },
    };

    // If 404, return error
    const error_text = page.querySelector(".text01");
    if( error_text && error_text.textContent && error_text.textContent.match("404 Not Found") ) {
        result_data.message = "video not found";
        res.status(404);
        res.json(result_data);
        return;
    }

    // Otherwise, retrive info
    result_data.message = "success";
    const get_dom_text = (page: Document, selector: string) => {
        const dom = page.querySelector(selector);
        const result = dom?.textContent?.trim();
        return result ? result : "";
    };
    const get_video = (page: Document): string => {
        const dom = page.querySelector("video");
        return dom ? dom.src : "";
    }
    /**
     * get_table_item(table, "監督") // 芳賀栄太郎
     * @param table 
     * @param input 
     */
    const get_table_item = (table: Element[], input: string): string => {
        const find_item = table.find( (elem) => {
            const th = elem.querySelector(".th");
            return th?.textContent?.includes( input );
        });
        if( find_item ) {
            const d = find_item.querySelector(".td");
            return d ? d.textContent?.replace("DVD", "").trim() ?? "" : "";
        }
        return "";
    };
    const get_actors = (table: Element[], input: string): ActorInterface[] => {
        const find_item = table.find( (elem) => {
            const th = elem.querySelector(".th");
            return th?.textContent?.includes( input );
        });
        if( find_item ) {
            const dom = find_item.querySelector(".td");
            return dom  ? getActorDatas([...dom.querySelectorAll("a")]) : [];
        }
        return [];
    };
    const video_datas = [...page.querySelectorAll(".p-workPage__table .item")];
    result_data.result = {
        link: result_data.result.link ?? "",
        title: get_dom_text(page, ".p-workPage__title"),
        description: get_dom_text(page, ".p-workPage__text"),
        preview: get_video(page),
        time: get_table_item(video_datas, "収録時間"),
        series: get_table_item(video_datas, "シリーズ"),
        id: get_table_item(video_datas, "品番"),
        price: get_table_item(video_datas, "価格"),
        release: get_table_item(video_datas, "発売日"),
        actors: get_actors(video_datas, "女優"),
        genre: [],
    };
    res.json(result_data);
};

