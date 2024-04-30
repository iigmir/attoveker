export interface PaginationInterface {
    page: number,
    total: number,
    items: number,
    start: number,
    end: number,
}

export interface RequestResponse<T> {
    message: string
    /**
     * @see <https://stackoverflow.com/a/74312037>
     */
    params?: {
        [key: string]: string;
    }
    result: T;
    pagination?: PaginationInterface
}
