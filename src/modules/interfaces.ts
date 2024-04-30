/**
 * `全{TOTAL}{UNIT}中 {START} 〜 {END} {UNIT2}を表示`
 */
export interface PaginationInterface {
    /**
     * From the `page` QS param.
     */
    page: number,
    /**
     * `{TOTAL}` in `全{TOTAL}{UNIT}中 {START} 〜 {END} {UNIT2}を表示`
     */
    total: number,
    /**
     * In `全{TOTAL}{UNIT}中 {START} 〜 {END} {UNIT2}を表示`, you need:
     * (`{START}` - `{END}`) - `1`
     */
    items: number,
    /**
     * `{START}` in `全{TOTAL}{UNIT}中 {START} 〜 {END} {UNIT2}を表示`
     */
    start: number,
    /**
     * `{END}` in `全{TOTAL}{UNIT}中 {START} 〜 {END} {UNIT2}を表示`
     */
    end: number,
}

/**
 * As a response what should you be?
 */
export interface RequestResponse<T> {
    /**
     * If the text is not "success", you really need to read it.
     */
    message: string
    /**
     * @see <https://stackoverflow.com/a/74312037>
     */
    params?: {
        [key: string]: string;
    }
    /**
     * Show info if there's pages use the `page` param. Usually it will be something like this:
     * 
     * `全{TOTAL}{UNIT}中 {START} 〜 {END} {UNIT2}を表示`
     */
    pagination?: PaginationInterface
    /**
     * Intetface type should decided by the class.
     */
    result: T;
}

/**
 * Alias of `RequestResponse`
 */
export interface RequestResponseInterface<T> extends RequestResponse<T> {};
