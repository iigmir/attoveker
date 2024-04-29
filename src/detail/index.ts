import { get_webpage } from "../api.js";
import type { Request, Response } from "express";
import type { RequestResponse } from "../interfaces.js";

export const main = async (req: Request, res: Response) => {
    const page = await get_webpage(`https://attackers.net/works/detail/${req.params.id}`);
    const result_data: RequestResponse = {
        message: "",
        params: req.params,
        result: {
            link: `https://attackers.net/works/detail/${req.params.id}`,
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
    function get_dom_text(page: Document, selector: string) {
        const dom = page.querySelector(selector);
        return dom ? dom.textContent?.trim() : "";
    }
    result_data.result = {
        link: result_data.result.link ?? "",
        title: get_dom_text(page, ".p-workPage__title"),
        description: get_dom_text(page, ".p-workPage__text"),
        // actors: page.querySelector(".p-workPage__text").textContent,
    };
    res.json(result_data);
};

