import type { ActorInterface, RequestResponse } from "../interfaces.js";

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
    actors: ActorInterface[]
    // genre: ActorInterface[]
}

export interface VideoDetailInterface extends RequestResponse<VideoDetailResultInterface> {}
