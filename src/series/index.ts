import { get_webpage } from "../api.js";
import { SinglePageTags } from "../modules.js";
import type { Request, Response } from "express";

export const main = async (req: Request, res: Response) => {
    const page = await get_webpage("https://attackers.net/works/series");
    res.json({
        message: "success",
        result: (new SinglePageTags(page)).api(),
    });
};
