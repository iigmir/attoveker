import type { ActorInterface, BasicLinkInterface } from "../modules/links.js";
import { RequestResponse } from "../modules/interfaces.js";

export interface VideoDetailResultInterface {
    // Metadata
    link: string
    title: string
    description: string
    preview: string
    // Infos
    actors: ActorInterface[]
    release: string
    series: BasicLinkInterface[]
    label: BasicLinkInterface[]
    genre: BasicLinkInterface[]
    director: string
    id: string
    time: string
    price: string
}

export interface VideoDetailInterface extends RequestResponse<VideoDetailResultInterface> {}
