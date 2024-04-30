import type { ActorInterface, BasicLinkInterface } from "../modules/actor.js";
import { RequestResponse } from "../interfaces.js";

export interface VideoDetailResultInterface {
    link: string
    id: string
    title: string
    description: string
    time: string
    price: string
    preview: string
    series: string
    release: string
    director: string
    actors: ActorInterface[]
    genre: BasicLinkInterface[]
}

export interface VideoDetailInterface extends RequestResponse<VideoDetailResultInterface> {}
