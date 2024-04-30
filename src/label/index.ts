import { get_label } from "../api.js";
import { DomList } from "../modules/basic.js";
import { ImageCards, ImageCardsInterface } from "../modules/lists.js";
import { GetPaginationByDom, GetPageParam } from "../modules/utils.js";
// Interfaces
import type { RequestResponse } from "../modules/interfaces.js";
import type { Request, Response } from "express";

class LabelCards extends DomList {
    dom_name = ".labels a.item"
    constructor(input: Document) {
        super();
        if( input ) {
            this.set_list_by_dom(input);
        }
    }
    api() {
        return this.list.map( (its) => {
            const a = its as HTMLAnchorElement;
            return {
                link: a.href,
                id: a.href.replace( /\D/g, "" ),
                logo: a.querySelector("img")?.dataset.src ?? "",
                title: a.querySelector(".title")?.textContent ?? "",
                text: a.querySelector(".text")?.textContent ?? "",
            };
        });
    }
}

export const by_id = async (req: Request, res: Response) => {
    const page = await get_label(`${req.params.id}`, GetPageParam(req.query.page));
    const result: RequestResponse<ImageCardsInterface[]> = {
        message: "success",
        params: {
            ...req.params,
            /**
             * `req.query` is a strange API... Don't move it.
             */
            ...req.query as any,
        },
        pagination: GetPaginationByDom(
            page.body,
            parseInt(GetPageParam(req.query.page), 10)
        ),
        result: (new ImageCards(page)).api(),
    };
    res.json(result);
};

export const main = async (req: Request, res: Response) => {
    const page_param = req.query.page?.toString() ?? "1";
    const page = await get_label("", page_param);
    res.json({
        message: "success",
        result: (new LabelCards(page)).api(),
    });
};
