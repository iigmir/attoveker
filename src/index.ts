import express from "express";
import { main as main_api } from "./top/index.js";
import { main as main_series } from "./series/index.js";
import { main as main_genres } from "./genre/index.js";
import { main as main_releases } from "./release/index.js";
import { main as get_labels_all, by_id as get_labels_by_id } from "./label/index.js";
import { main as main_reserves } from "./reserve/index.js";
import { main as main_detail } from "./detail/index.js";
import { main as main_actress, detail as get_actress_detail } from "./actress/index.js";

const app = express();

/**
 * Hello the API. Also a test.
 */
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});
app.get("/detail", (req, res) => {
    res.status(400);
    res.json({
        message: "video ID not provided"
    });
});
/**
 * Videos from <https://attackers.net/works/detail/{ID}>
 * @see <https://attackers.net/works/detail/ADN551>
 * @see <https://attackers.net/works/detail/ATID141>
 */
app.get("/detail/:id", main_detail);

/**
 * Videos from <https://attackers.net/top>
 */
app.get("/top", main_api);

/**
 * Videos from <https://attackers.net/works/series>
 */
app.get("/series", main_series);
/**
 * Videos from <https://attackers.net/works/genre>
 */
app.get("/genre", main_genres);
/**
 * Videos from <https://attackers.net/works/list/release>
 */
app.get("/release", main_releases);
/**
 * Videos from <https://attackers.net/works/label>
 */
app.get("/label", get_labels_all);
app.get("/label/:id", get_labels_by_id);

/**
 * Videos from <https://attackers.net/works/list/reserve>
 */
app.get("/reserve", main_reserves);

/**
 * Videos from <https://attackers.net/works/list/actress>
 */
app.get("/actress", main_actress);
app.get("/actress/:id", get_actress_detail);

export default app;

