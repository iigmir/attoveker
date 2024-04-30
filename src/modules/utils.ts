/**
 * GetLinkId("https://attackers.net/works/detail/ATVR053") // returns "ATVR053"
 * @see /tests/utils.spec.js, `GetLinkId` instance
 * @param url URL. Of course.
 * @returns ID from given URL
 */
export function GetLinkId(url = "") {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const queryIndex = lastPart.indexOf("?");
    const id = queryIndex !== -1 ? lastPart.substring(0, queryIndex) : lastPart;
    if( id === "#" || id === "actress#" ) {
        return "";
    }
    return id;
}
