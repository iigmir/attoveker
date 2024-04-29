export interface ActorInterface {
    name: string
    link: string
    id: string
}

export interface RequestResponse<T> {
    message: string
    /**
     * @see <https://stackoverflow.com/a/74312037>
     */
    params: {
        [key: string]: string;
    }
    result: T;
}

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
