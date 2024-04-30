export class DomList {
    // DOM module
    dom_name = "";

    // List module
    list_src: Element[] = [];
    get list() {
        return this.list_src;
    }
    set list(input: Element[]) {
        this.list_src = input;
    }

    // Other modules
    /**
     * Set `list` as DOM elements.
     * @param {Document} input
     * @returns
     */
    set_list_by_dom(input: Document) {
        const ary = [...input.querySelectorAll(this.dom_name)];
        this.list_src = ary;
        return this.list_src;
    }
}
