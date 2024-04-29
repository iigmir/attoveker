import { get_webpage } from "../api.js";
import { ImageCards } from "../modules.js";
import type { Request, Response } from "express";

export const main = async (req: Request, res: Response) => {
    const page = await get_webpage("https://attackers.net/works/list/reserve");
    res.json({
        message: "success",
        result: (new ImageCards(page)).api(),
    });
};
