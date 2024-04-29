export interface VideoDetailInterface {
    link: string
    title?: string
    description?: string
}

export interface ActorInterface {
    name: string
    link: string
    id: string
}

export interface RequestResponse {
    message: string
    /**
     * @see <https://stackoverflow.com/a/74312037>
     */
    params: {
        [key: string]: string;
    }
    result: VideoDetailInterface
}
