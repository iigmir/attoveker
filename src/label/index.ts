import { get_webpage } from "../api.js";
import { DomList } from "../modules/basic.js";
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
    const page = await get_webpage(`https://attackers.net/works/label/${req.params.id}`);
    res.json({
        message: "success",
        result: (new LabelCards(page)).api(),
    });
};

export const main = async (req: Request, res: Response) => {
    const page = await get_webpage("https://attackers.net/works/label");
    res.json({
        message: "success",
        result: (new LabelCards(page)).api(),
    });
};
